// =============================================================
// verify-manifest.js のテスト（依存なし・Node標準のみ）
//
// HNS-Rev査読の4ケースを一時フィクスチャで再現する。
//   1. 正常系          → ExitCode 0 / 全件OK
//   2. ファイル欠落     → ExitCode 1 / MISSING検出
//   3. SHA不一致        → ExitCode 1 / MISMATCH検出
//   4. Manifest改ざん   → hash改ざんは ExitCode 1、構造破壊は ExitCode 2
// 併せてCLIの終了コード契約を spawn で確認する。
// 正本ファイルには一切触れない（temp配下のフィクスチャのみ使用）。
// =============================================================
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");
const { verify, EXIT_OK, EXIT_VERIFY_FAILED, EXIT_MANIFEST_ERROR } = require("./verify-manifest.js");

const SCRIPT = path.join(__dirname, "verify-manifest.js");
const sha256 = buf => crypto.createHash("sha256").update(buf).digest("hex");

function makeFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hns-vm-"));
  fs.mkdirSync(path.join(dir, "data"), { recursive: true });
  const fileA = path.join(dir, "data", "a.yaml");
  const fileB = path.join(dir, "data", "b.yaml");
  fs.writeFileSync(fileA, "content-A\n");
  fs.writeFileSync(fileB, "content-B\n");
  return { dir, fileA, fileB, shaA: sha256(fs.readFileSync(fileA)), shaB: sha256(fs.readFileSync(fileB)) };
}

function writeManifest(dir, entries) {
  const lines = ["canonical_files:"];
  for (const e of entries) {
    lines.push(`  - path: "${e.path}"`);
    lines.push(`    sha256: "${e.sha256}"`);
  }
  lines.push('audit_chain: "test"');
  const p = path.join(dir, "data", "hns_manifest.yaml");
  fs.writeFileSync(p, lines.join("\n") + "\n");
  return p;
}

let passed = 0;
function ok(name, cond) {
  assert.ok(cond, name);
  console.log(`  ok - ${name}`);
  passed++;
}

// 1. 正常系
{
  const fx = makeFixture();
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("正常系: ExitCode 0", r.code === EXIT_OK);
  ok("正常系: 全件OK", r.results.every(x => x.status === "OK"));
}

// 2. ファイル欠落
{
  const fx = makeFixture();
  fs.rmSync(fx.fileB);
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("欠落: ExitCode≠0", r.code === EXIT_VERIFY_FAILED);
  ok("欠落: MISSING検出", r.results.some(x => x.status === "MISSING" && x.path === "data/b.yaml"));
}

// 3. SHA不一致（Manifest生成後に正本が変化）
{
  const fx = makeFixture();
  fs.writeFileSync(fx.fileA, "tampered-A\n");
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("不一致: ExitCode≠0", r.code === EXIT_VERIFY_FAILED);
  ok("不一致: MISMATCH検出", r.results.some(x => x.status === "MISMATCH" && x.path === "data/a.yaml"));
}

// 4a. Manifest改ざん（記載hash値の改ざん）
{
  const fx = makeFixture();
  const alteredSha = fx.shaA.replace(/.$/, c => (c === "0" ? "1" : "0"));
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: alteredSha },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("改ざん(hash値): ExitCode≠0", r.code === EXIT_VERIFY_FAILED);
  ok("改ざん(hash値): MISMATCH検出", r.results.some(x => x.status === "MISMATCH" && x.path === "data/a.yaml"));
}

// 4b. Manifest改ざん（構造破壊 → 照合不能）
{
  const fx = makeFixture();
  const p = path.join(fx.dir, "data", "hns_manifest.yaml");
  fs.writeFileSync(p, "totally: broken\nno_canonical_files: here\n");
  const r = verify({ manifestPath: p, baseDir: fx.dir });
  ok("改ざん(構造破壊): Manifest異常(ExitCode 2)", r.code === EXIT_MANIFEST_ERROR);
}

// 4c. path traversal（Manifest改ざんの一種：外部パス指定を拒否）
{
  const fx = makeFixture();
  const mf = writeManifest(fx.dir, [{ path: "../../etc/passwd", sha256: fx.shaA }]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("改ざん(外部パス): INVALID_PATHで拒否", r.results.some(x => x.status === "INVALID_PATH"));
  ok("改ざん(外部パス): ExitCode≠0", r.code === EXIT_VERIFY_FAILED);
}

// 5. CRLF/LF変更（改行変換は正本の実体変更 → MISMATCH検出が正）
{
  const fx = makeFixture(); // fileA は LF で作成、shaA は LF 版
  fs.writeFileSync(fx.fileA, "content-A\r\n"); // CRLF へ変換
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("CRLF/LF変更: ExitCode≠0", r.code === EXIT_VERIFY_FAILED);
  ok("CRLF/LF変更: MISMATCHとして検出", r.results.some(x => x.status === "MISMATCH" && x.path === "data/a.yaml"));
}

// 6. Manifest未登録ファイルの追加（記載分のみ照合・ExitCode不変）
{
  const fx = makeFixture(); // data/ に a.yaml, b.yaml
  fs.writeFileSync(path.join(fx.dir, "data", "c.yaml"), "unregistered\n"); // 未登録ファイル
  const mf = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r = verify({ manifestPath: mf, baseDir: fx.dir });
  ok("未登録追加: ExitCode 0（不変）", r.code === EXIT_OK);
  ok("未登録追加: 照合対象は記載2件のみ", r.results.length === 2);
}

// 7. Manifestエントリ順序変更（照合結果・ExitCode不変）
{
  const fx = makeFixture();
  const forward = writeManifest(fx.dir, [
    { path: "data/a.yaml", sha256: fx.shaA },
    { path: "data/b.yaml", sha256: fx.shaB }
  ]);
  const r1 = verify({ manifestPath: forward, baseDir: fx.dir });
  const reversed = writeManifest(fx.dir, [
    { path: "data/b.yaml", sha256: fx.shaB },
    { path: "data/a.yaml", sha256: fx.shaA }
  ]);
  const r2 = verify({ manifestPath: reversed, baseDir: fx.dir });
  ok("順序変更: 両順ともExitCode 0", r1.code === EXIT_OK && r2.code === EXIT_OK);
  ok("順序変更: 両順とも全件OK", r1.results.every(x => x.status === "OK") && r2.results.every(x => x.status === "OK"));
}

// CLI終了コード契約（実プロセスで確認）
{
  const fx = makeFixture();
  const mf = writeManifest(fx.dir, [{ path: "data/a.yaml", sha256: fx.shaA }]);
  const run = spawnSync(process.execPath, [SCRIPT, mf, fx.dir], { encoding: "utf8" });
  ok("CLI正常系: exit 0", run.status === 0);

  const fx2 = makeFixture();
  const mf2 = writeManifest(fx2.dir, [{ path: "data/a.yaml", sha256: "0".repeat(64) }]);
  const bad = spawnSync(process.execPath, [SCRIPT, mf2, fx2.dir], { encoding: "utf8" });
  ok("CLI不一致: exit≠0", bad.status !== 0);
}

console.log(`\n${passed} checks passed.`);
