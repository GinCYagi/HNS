// =============================================================
// HNS Manifest 照合ユーティリティ
//
// data/hns_manifest.yaml に記載された正本ファイルを SHA-256 で照合する。
//   - 一致       : ExitCode 0
//   - 不一致/欠落 : ExitCode 1
//   - Manifest異常: ExitCode 2（読取不可・解析不能・エントリ空・形式不正）
// 正本ファイルは読取りのみで変更しない。
//
// 依存: Node.js 標準モジュールのみ（外部依存を追加しない現行方針を踏襲）。
// =============================================================
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_MANIFEST = path.resolve(__dirname, "..", "data", "hns_manifest.yaml");

const EXIT_OK = 0;
const EXIT_VERIFY_FAILED = 1;
const EXIT_MANIFEST_ERROR = 2;

function sha256File(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

// Manifestの canonical_files ブロックから path / sha256 の対を抽出する。
// 汎用YAMLパーサではなく、本Manifestのスキーマに限定した最小抽出。
// 外部依存を持ち込まないために意図的にスキーマ固有としている。
function parseCanonicalFiles(text) {
  const lines = text.split(/\r?\n/);
  const entries = [];
  let inBlock = false;
  let current = null;

  for (const line of lines) {
    if (!inBlock) {
      if (/^canonical_files:\s*(#.*)?$/.test(line)) inBlock = true;
      continue;
    }
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) continue; // 空行・コメントは無視
    if (/^\S/.test(line)) break;                            // 次のトップレベルキーでブロック終端

    const listItem = /^\s*-\s+(.*)$/.exec(line);
    const content = listItem ? listItem[1] : line.trim();

    let m = /^path:\s*["']?(.+?)["']?\s*$/.exec(content);
    if (m) {
      current = { path: m[1].trim(), sha256: null };
      entries.push(current);
      continue;
    }
    m = /^sha256:\s*["']?([0-9a-fA-F]+)["']?\s*$/.exec(content);
    if (m && current) current.sha256 = m[1].toLowerCase();
  }
  return entries;
}

// options: { manifestPath, baseDir }
// baseは正本パスの解決基点。Manifestは <root>/data/ 配下にあるため既定はリポジトリルート。
function verify(options) {
  options = options || {};
  const manifestPath = options.manifestPath || DEFAULT_MANIFEST;
  const baseDir = path.resolve(options.baseDir || path.resolve(path.dirname(manifestPath), ".."));

  let text;
  try {
    text = fs.readFileSync(manifestPath, "utf8");
  } catch (error) {
    return { code: EXIT_MANIFEST_ERROR, error: `Manifest読取不可: ${manifestPath}（${error.message}）`, results: [] };
  }

  const entries = parseCanonicalFiles(text);
  if (entries.length === 0) {
    return { code: EXIT_MANIFEST_ERROR, error: "Manifestに canonical_files エントリが存在しません", results: [] };
  }
  for (const entry of entries) {
    if (!entry.path || !entry.sha256 || !/^[0-9a-f]{64}$/.test(entry.sha256)) {
      return { code: EXIT_MANIFEST_ERROR, error: `Manifestエントリ形式不正: ${JSON.stringify(entry)}`, results: [] };
    }
  }

  const results = [];
  for (const entry of entries) {
    const abs = path.resolve(baseDir, entry.path);
    if (abs !== baseDir && !abs.startsWith(baseDir + path.sep)) {
      results.push({ path: entry.path, status: "INVALID_PATH", expected: entry.sha256, actual: null });
      continue;
    }
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      results.push({ path: entry.path, status: "MISSING", expected: entry.sha256, actual: null });
      continue;
    }
    let actual;
    try {
      actual = sha256File(abs);
    } catch (error) {
      results.push({ path: entry.path, status: "ERROR", expected: entry.sha256, actual: error.message });
      continue;
    }
    results.push({ path: entry.path, status: actual === entry.sha256 ? "OK" : "MISMATCH", expected: entry.sha256, actual });
  }

  const failed = results.some(r => r.status !== "OK");
  return { code: failed ? EXIT_VERIFY_FAILED : EXIT_OK, results };
}

function main(argv) {
  const manifestPath = argv[2] ? path.resolve(argv[2]) : DEFAULT_MANIFEST;
  const baseDir = argv[3] ? path.resolve(argv[3]) : undefined;
  const outcome = verify({ manifestPath, baseDir });

  console.log("HNS Manifest 照合");
  console.log(`  manifest: ${manifestPath}`);

  if (outcome.error) {
    console.error(`  ERROR: ${outcome.error}`);
    return outcome.code;
  }

  const width = Math.max(...outcome.results.map(r => r.path.length));
  for (const r of outcome.results) {
    const line = `  [${r.status.padEnd(9)}] ${r.path.padEnd(width)}`;
    (r.status === "OK" ? console.log : console.error)(line);
  }

  const diffs = outcome.results.filter(r => r.status !== "OK");
  console.log("");
  if (diffs.length === 0) {
    console.log(`  OK: ${outcome.results.length}/${outcome.results.length} 件一致`);
  } else {
    console.error(`  FAILED: ${diffs.length}/${outcome.results.length} 件が不一致`);
    for (const d of diffs) {
      console.error(`    - ${d.path} [${d.status}]`);
      console.error(`        expected: ${d.expected}`);
      console.error(`        actual:   ${d.actual || "(none)"}`);
    }
  }
  return outcome.code;
}

if (require.main === module) {
  process.exitCode = main(process.argv);
}

module.exports = { verify, parseCanonicalFiles, sha256File, EXIT_OK, EXIT_VERIFY_FAILED, EXIT_MANIFEST_ERROR };
