"use strict";
// =============================================================
// 引き口（S1。docs/proposals/2026-10-24_reference_system.md §1-1）
//
// 字・名・読みを、リポジトリの記録の全部から引き、当たった行を切らずに出す。
//   node scripts/lookup.js <字・名・DIFF の番号> [--yomi よみ] [--orig 元のよみ] [--postal <csv>] [--max N] [--all]
//   --max は記録の種ごとに出す行の数（既定 40）。出さなかった行の数は必ず書く。
//   郵便番号データ（utf_ken_all.csv）はリポジトリに入れない。--postal か環境変数 HNS_POSTAL で場所を渡す。
//
// 出すもの
//   1. 正本：当たった行の real・fictional と、どの欄に当たったか（決めた名／前の名・外した案／説明の中）
//   2. 決まり（pending_items の DIFF、review_dictionary の RUL・外した名）
//   3. かご・つながりの地図・引き継ぎ・査読・提案書（新しい順）
//   4. M4 の「未登録の Gin の答え」の一覧（pending_items の unregistered_answers）に載っているか。
//      載っていなくて、正本の名の欄にも当たりがなく、提案・査読に Gin の言葉と一緒に出るときは注意を出す
//   5. 郵便番号データ：字を含む町域の「組の数」と「名の数」、読みの一致（そのまま・濁りを除いて・含む）
//   6. --yomi があれば拍の数、--orig があれば元と同じ拍 n/m
//   7. 引いた範囲（ファイル・commit・郵便番号データの版。郵便番号データは小字・集落を含まない）
// =============================================================
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BASE = path.join(__dirname, "..");

// 同じ字の別の形（旧字・異体字）。一緒に引く
const VARIANTS = [
  ["沢", "澤"], ["島", "嶋", "嶌"], ["浜", "濱"], ["塩", "鹽"], ["関", "關"], ["鴎", "鷗"],
  ["渓", "溪"], ["竜", "龍"], ["桜", "櫻"], ["国", "國"], ["万", "萬"], ["辺", "邊", "邉"],
  ["斎", "齋", "齊"], ["広", "廣"], ["滝", "瀧"], ["恵", "惠"], ["栄", "榮"],
  ["ケ", "ヶ"],
];

const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const isKana = s => /^[ぁ-ゖァ-ーー]+$/.test(s);

// 濁り・半濁りを除く（連濁を見るため）
const DAKU = { "ガ": "カ", "ギ": "キ", "グ": "ク", "ゲ": "ケ", "ゴ": "コ", "ザ": "サ", "ジ": "シ", "ズ": "ス", "ゼ": "セ", "ゾ": "ソ",
  "ダ": "タ", "ヂ": "チ", "ヅ": "ツ", "デ": "テ", "ド": "ト", "バ": "ハ", "ビ": "ヒ", "ブ": "フ", "ベ": "ヘ", "ボ": "ホ",
  "パ": "ハ", "ピ": "ヒ", "プ": "フ", "ペ": "ヘ", "ポ": "ホ", "ヴ": "ウ" };
const seion = s => toKata(s).replace(/[ガ-ポヴ]/g, c => DAKU[c] || c);

// 拍に分ける（小さい ャュョァィゥェォヮ は前の字と一つ。ッ・ン・ー は一拍）
function morae(yomi) {
  const k = toKata(yomi);
  const out = [];
  for (const c of k) {
    if (/[ャュョァィゥェォヮ]/.test(c) && out.length) out[out.length - 1] += c;
    else out.push(c);
  }
  return out;
}
// 元と同じ拍：候補の拍のうち、元の拍に（数も合わせて）あるもの
function sameMorae(cand, orig) {
  const pool = orig.slice();
  let n = 0;
  for (const m of cand) { const i = pool.indexOf(m); if (i >= 0) { pool.splice(i, 1); n++; } }
  return n;
}

function variantsOf(term) {
  const set = new Set([term]);
  for (const group of VARIANTS) {
    for (const s of [...set]) {
      for (const a of group) {
        if (!s.includes(a)) continue;
        for (const b of group) set.add(s.split(a).join(b));
      }
    }
  }
  if (isKana(term)) { set.add(toKata(term)); set.add(toHira(term)); }
  return [...set];
}

function listSources() {
  const groups = [];
  const add = (label, files) => groups.push({ label, files: files.filter(f => fs.existsSync(path.join(BASE, f))) });
  add("正本", ["data/hns_admin_division_master.yaml"]);
  add("決まり（DIFF・保留）", ["data/hns_pending_items.yaml"]);
  add("決まり（RUL）・外した名の辞書", ["data/hns_review_dictionary.yaml"]);
  add("仕様", ["data/hns_specification_v0.1.yaml"]);
  add("かご", ["docs/kago.md"]);
  add("つながりの地図", ["docs/tsunagari.md"]);
  const dir = d => {
    const p = path.join(BASE, d);
    return fs.existsSync(p) ? fs.readdirSync(p).filter(f => f.endsWith(".md")).sort().reverse().map(f => `${d}/${f}`) : [];
  };
  add("引き継ぎ", dir("docs/handoffs"));
  add("査読", dir("docs/reviews"));
  add("提案", dir("docs/proposals"));
  return groups;
}

// 正本の一行から key: "value" を拾う
function fields(line) {
  const out = {};
  const re = /([A-Za-z_][A-Za-z0-9_]*): "((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(line))) if (!(m[1] in out)) out[m[1]] = m[2];
  return out;
}
const NAME_KEYS = ["real", "fictional", "yomi", "hns", "kuni", "name", "common_name", "short"];

function classifyMaster(line, terms) {
  const f = fields(line);
  const hitKeys = Object.keys(f).filter(k => terms.some(t => f[k].includes(t)));
  const inName = hitKeys.some(k => NAME_KEYS.includes(k));
  const inPrev = hitKeys.includes("prev") || hitKeys.some(k => /外した/.test(f[k]) && terms.some(t => {
    const v = f[k]; const i = v.indexOf("外した"); return i >= 0 && v.slice(i).includes(t);
  }));
  const kind = inName ? "決めた名" : inPrev ? "前の名・外した案" : "説明の中";
  const who = f.real || f.kuni || f.name || "";
  const what = f.fictional || f.hns || "";
  return { kind, hitKeys, who, what };
}

function gitCommit() {
  try {
    const h = execSync("git rev-parse --short HEAD", { cwd: BASE }).toString().trim();
    const dirty = execSync("git status --porcelain", { cwd: BASE }).toString().trim() ? "（手元に commit していない変更あり）" : "";
    return h + dirty;
  } catch (e) { return "（git を読めなかった）"; }
}

function readPostal(p) {
  const rows = fs.readFileSync(p, "utf8").split(/\r?\n/).filter(Boolean).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "")));
  return rows.map(c => ({ cityKana: c[4], kana: c[5], pref: c[6], city: c[7], town: c[8].replace(/（.*$/, "") }))
    .filter(r => r.town && !/以下に掲載がない場合|次に番地がくる場合/.test(r.town));
}

function lookup(term, opts = {}) {
  const lines = [];
  const say = s => lines.push(s);
  const terms = variantsOf(term);
  const max = opts.all ? Infinity : (opts.max || 40);
  say(`■ 引いた言葉：${term}` + (terms.length > 1 ? `（一緒に引いた形：${terms.filter(t => t !== term).join("・")}）` : ""));

  const groups = listSources();
  let hidden = 0, total = 0;
  let masterNameHit = false;
  const ginLines = [];
  const uaHits = [];
  for (const g of groups) {
    const hits = [];
    for (const rel of g.files) {
      const text = fs.readFileSync(path.join(BASE, rel), "utf8").split(/\r?\n/);
      let section = "", currentId = "", heading = "";
      text.forEach((line, i) => {
        const top = line.match(/^\s{0,4}([a-z_]+):\s*$/) || line.match(/^([a-z_]+):/); if (top) section = top[1];
        const id = line.match(/- id: ((?:DIFF|RUL|G|C)-\d+)/); if (id) currentId = id[1];
        if (/^[a-z_]+:/.test(line) && !id) currentId = "";
        const h = line.match(/^#{1,4} (.*)/); if (h) heading = h[1];
        if (!terms.some(t => line.includes(t))) return;
        let label = `${rel}:${i + 1}`;
        if (rel.endsWith("hns_admin_division_master.yaml")) {
          const c = classifyMaster(line, terms);
          if (c.kind === "決めた名") masterNameHit = true;
          label += `［${section}］［${c.kind}］` + (c.who ? ` real=${c.who}` : "") + (c.what ? ` → ${c.what}` : "") + (c.hitKeys.length ? `（当たった欄：${c.hitKeys.join("・")}）` : "");
        } else if (rel.endsWith(".yaml")) {
          const ua = line.match(/\{id: (UA-\d+)/);
          if (ua) {
            const f = fields(line);
            label += `［未登録の Gin の答え ${ua[1]}］［${f.status || "状態の書きなし"}］`;
            uaHits.push(`${ua[1]}（${f.status || "状態の書きなし"}）`);
          } else if (currentId) label += `［${currentId}］`;
          if (/\{name: "/.test(line)) label += "［外した名の辞書］";
        } else if (heading) {
          label += `［${heading}］`;
        }
        if ((g.label === "提案" || g.label === "査読") && /Gin「/.test(line)) ginLines.push(`${rel}:${i + 1}`);
        // 決まりの番号そのものに当たったときは、その項目を次の項目の前まで丸ごと出す（文は次の行にある）
        let body = line;
        if (rel.endsWith(".yaml") && new RegExp(`- id: ${term}\\s*$`).test(line)) {
          const rest = [];
          for (let k = i + 1; k < text.length && !/^\s*- id: /.test(text[k]) && !/^[a-z_]+:/.test(text[k]); k++) rest.push(text[k]);
          body = [line, ...rest].join("\n  ");
        }
        hits.push({ label, line: body });
      });
    }
    total += hits.length;
    if (!hits.length) continue;
    // 決まりの番号で引いたときは、その決まりの項目を先に出す（UA などの言及より前に）
    hits.sort((a, b) => (new RegExp(`- id: ${term}\\s`).test(b.line) ? 1 : 0) - (new RegExp(`- id: ${term}\\s`).test(a.line) ? 1 : 0));
    say(`\n== ${g.label}（${hits.length} 行）`);
    hits.slice(0, max).forEach(h => { say(`- ${h.label}`); say(`  ${h.line}`); });
    if (hits.length > max) { say(`  （この種のほか ${hits.length - max} 行は出していない）`); hidden += hits.length - max; }
  }
  if (total === 0) say("\n（リポジトリの記録には当たりなし。範囲は下の「引いた範囲」）");
  if (hidden) say(`\n（出していない行が合わせて ${hidden}。--all で全部、--max N で種ごとの数を変える）`);

  const uaOpen = uaHits.filter(u => !/登録済み|登録の要なし/.test(u));
  if (uaOpen.length) {
    say(`\n！ M4 の「未登録の Gin の答え」の一覧（pending_items の unregistered_answers）に、まだ登録されていない答えがある：${uaOpen.join("、")}`);
  }
  if (uaHits.length > uaOpen.length) {
    say(`\n・ M4 の一覧で登録済み（または登録の要なし）になった答え：${uaHits.filter(u => !uaOpen.includes(u)).join("、")}`);
  }
  if (uaHits.length) {
    // 一覧に載っていれば、下の「どこにも登録されていない」の注意は出さない
  } else if (!masterNameHit && ginLines.length && !/^(DIFF|RUL|UA)-\d+$/.test(term)) {
    say(`\n！ 正本の名の欄（real・fictional など）に当たりがなく、M4 の未登録の一覧にもない。提案・査読には Gin の言葉と一緒に ${ginLines.length} 行出る：${ginLines.slice(0, 5).join("、")}${ginLines.length > 5 ? " ほか" : ""}。Gin が答えたが、どこにも登録されていないかもしれない（読み取り。M4 に知らせる）`);
  }

  // 拍
  if (opts.yomi) {
    const c = morae(opts.yomi);
    say(`\n== 拍\n- ${opts.yomi}：${c.length} 拍（${c.join("・")}）${c.length >= 5 ? "　★5拍以上" : ""}`);
    if (opts.orig) {
      const o = morae(opts.orig);
      const n = sameMorae(c, o);
      const ns = sameMorae(c.map(seion), o.map(seion));
      say(`- 元 ${opts.orig}：${o.length} 拍。元と同じ拍 ${n}/${o.length}` + (ns !== n ? `（濁りを除くと ${ns}/${o.length}）` : "") + (n * 2 >= o.length ? "　★半分以上が元と同じ" : ""));
      if (seion(opts.yomi) === seion(opts.orig)) say(`- ★濁りを除くと元の読みと同じ（${opts.yomi}＝${opts.orig}）`);
    }
  }

  // 郵便番号データ
  const postal = opts.postal || process.env.HNS_POSTAL;
  let postalNote = "郵便番号データ：渡されていない（--postal か HNS_POSTAL）。町域は引いていない";
  if (postal && fs.existsSync(postal)) {
    const st = fs.statSync(postal);
    const rows = readPostal(postal);
    postalNote = `郵便番号データ：${path.basename(postal)}（ファイルの日付 ${st.mtime.toISOString().slice(0, 10)}、${rows.length} 行）。**小字・集落は含まない**（国土地理院の住所検索は別）`;
    say("\n== 郵便番号データ");
    if (!isKana(term)) {
      const hit = rows.filter(r => terms.some(t => r.town.includes(t)));
      const pairs = [...new Set(hit.map(r => r.pref + r.city + "｜" + r.town))];
      const names = [...new Set(hit.map(r => r.town))];
      const cities = [...new Set(rows.filter(r => terms.some(t => r.city.includes(t))).map(r => r.pref + r.city))];
      say(`- 字を含む町域：組の数（府県・市区町村・町域で一つ）${pairs.length}、名の数（町域の名で一つ）${names.length}`);
      if (pairs.length) say(`  例：${pairs.slice(0, 12).join(" / ")}${pairs.length > 12 ? " ほか" : ""}`);
      say(`- 字を含む市区町村：${cities.length}${cities.length ? "（" + cities.slice(0, 8).join(" / ") + (cities.length > 8 ? " ほか" : "") + "）" : ""}`);
    }
    const yomi = opts.yomi || (isKana(term) ? term : null);
    if (yomi) {
      const K = toKata(yomi), S = seion(yomi);
      const exact = [...new Set(rows.filter(r => r.kana === K).map(r => r.pref + r.city + r.town))];
      const soft = [...new Set(rows.filter(r => r.kana !== K && seion(r.kana) === S).map(r => r.pref + r.city + r.town + "（" + r.kana + "）"))];
      // 中に含むかも、濁りを除いて比べる（しなさか で 石名坂 イシナザカ を拾う。C5 の査読）
      const part = [...new Set(rows.filter(r => r.kana !== K && seion(r.kana) !== S && seion(r.kana).includes(S)).map(r => r.pref + r.city + r.town + "（" + r.kana + "）"))];
      say(`- 読み ${K} と同じ町域：${exact.length}${exact.length ? "（" + exact.slice(0, 8).join(" / ") + (exact.length > 8 ? " ほか" : "") + "）" : ""}`);
      say(`- 濁りを除くと同じ読みの町域：${soft.length}${soft.length ? "（" + soft.slice(0, 8).join(" / ") + (soft.length > 8 ? " ほか" : "") + "）" : ""}`);
      say(`- 読みを中に含む町域（濁りを除いて比べる）：${part.length}${part.length ? "（" + part.slice(0, 8).join(" / ") + (part.length > 8 ? " ほか" : "") + "）" : ""}`);
    }
  } else if (postal) {
    postalNote = `郵便番号データ：${postal} が見つからない。町域は引いていない`;
  }

  say("\n== 引いた範囲");
  for (const g of groups) say(`- ${g.label}：${g.files.length} ファイル`);
  say(`- commit：${gitCommit()}`);
  say(`- ${postalNote}`);
  say("- 国土地理院・Wikipedia・weblio は引いていない（S2 で足す）");
  say("- ここで当たりがないことは「引いて 0（この範囲で）」で、「ない」ではない");
  return lines.join("\n");
}

module.exports = { lookup, morae, sameMorae, seion, variantsOf };

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = {};
  const take = k => { const i = args.indexOf(k); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
  opt.yomi = take("--yomi");
  opt.orig = take("--orig");
  opt.postal = take("--postal");
  const mx = take("--max"); if (mx) opt.max = Number(mx);
  const ai = args.indexOf("--all"); if (ai >= 0) { opt.all = true; args.splice(ai, 1); }
  const term = args[0];
  if (!term) {
    console.error("使い方：node scripts/lookup.js <字・名・DIFF の番号> [--yomi よみ] [--orig 元のよみ] [--postal <csv>] [--max N] [--all]");
    process.exit(1);
  }
  console.log(lookup(term, opt));
}
