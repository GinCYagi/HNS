"use strict";
// =============================================================
// 決まりの棚卸し（決めた名が今の決まりに合っているかを見る）
//
//   node scripts/rule-check.js [--postal <csv>] [--add X=Y ...] [--list] [--reason R1|R2|R3|R4]
//   郵便番号データ（utf_ken_all.csv）はリポジトリに入れない。--postal か HNS_POSTAL で渡す（R3 で使う）。
//
// 見るもの（正本の採用の行で、real と作中の名〈fictional・hns〉があるもの）
//   R1 字の表（char_defaults の一字の行）：現実の字 X が、作中の名にもそのまま残っている
//      （X の行き先 Y が現実の名にもある入れ替えの組は、取り違えを避けて数えない）
//   R2 数の字（大字にする 一二三五十千万）：作中の名に現実の数の字がそのまま残っている
//      （数＋単位・数＋条・数＋丁目 は替えない〈UA-014〉ので数えない）
//   R3 読み：作中の名の読み（yomi）が、現実の名の読み（郵便番号データの町域・市区町村）とまるごと同じ
//      （読みを残す決まり〈朝日→朝暉 の形・相津・元号〉で同じになる名も入る）
//   R4 拍：名の後ろ（市・町・村・区・郡）を除いた芯の読みが 5 拍以上で、現実の芯より拍が増えたもの（DIFF-043。現実の読みが郵便番号データにある名だけ）
//   R5 川の名：rivers の節で、現実の名が 川 で終わり、作中の名が 川 で終わらない（川の名の終わりの 川 は替えない、7afc576）
//   --add X=Y：これから足す字の行（案）を当てたとき、新しく R1 に当たる名を出す（新しい決まりを問う前の材料）
//
// 当たった名は「決まりに合わないかもしれない名」で、すぐ直す名ではない。決めた名は動かさない前提で、
// 名ごとの例外として残すか、Gin に問うかを決める材料にする。notes などに「例外」とある名は別に数える。
// =============================================================
const fs = require("fs");
const path = require("path");
const { morae, seion } = require("./lookup");

const BASE = path.join(__dirname, "..");
const MASTER = path.join(BASE, "data", "hns_admin_division_master.yaml");

const fields = line => {
  const out = {};
  const re = /([A-Za-z_][A-Za-z0-9_]*): "((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(line))) if (!(m[1] in out)) out[m[1]] = m[2];
  return out;
};
const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));

const DIGIT = { "一": "壱", "二": "弐", "三": "参", "五": "伍", "十": "拾", "千": "阡", "万": "萬" };
const KEEP_AFTER = /[反段畝歩坪町丁間里丈尺寸石斗升貫条]|丁目/;

function readMaster() {
  const lines = fs.readFileSync(MASTER, "utf8").split(/\r?\n/);
  const names = [], table = [], words = [];
  let section = "", sub = "";
  lines.forEach((line, i) => {
    const outer = line.match(/^([a-z_]+):\s*$/);
    const inner = line.match(/^\s{2,4}([a-z_]+):\s*$/);
    if (outer) { section = outer[1]; sub = ""; }
    else if (inner) sub = inner[1];
    if (!/real: "/.test(line)) return;
    const f = fields(line);
    if (section === "char_defaults") {
      if (f.real && f.real.length === 1 && f.fictional && f.fictional.length === 1) table.push({ from: f.real, to: f.fictional, oneWay: /one_way: true/.test(line), forward: /これから/.test(f.notes || "") });
      if (f.real && f.real.startsWith("単語の表")) for (const pair of f.fictional.split("・")) { const [a, b] = pair.split("→"); if (a && b) words.push({ from: a, to: b }); }
      return;
    }
    const fic = f.fictional || f.hns;
    if (!fic || !f.real) return;
    if (f.verdict && !f.verdict.startsWith("採用")) return;
    names.push({ line: i + 1, section, sub, real: f.real, base: f.real.replace(/[（(].*$/, ""), fic, yomi: f.yomi || "", exception: /例外/.test(line) });
  });
  return { names, table, words };
}

function readPostal(p) {
  const map = new Map();
  const add = (k, v) => { if (!k) return; if (!map.has(k)) map.set(k, new Set()); map.get(k).add(v); };
  for (const l of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    if (!l) continue;
    const c = l.split(",").map(s => s.replace(/^"|"$/g, ""));
    const town = c[8].replace(/（.*$/, ""), tk = c[5].replace(/（.*$/, "");
    if (!/以下に掲載がない場合|次に番地がくる場合/.test(town)) add(town, tk);
    const city = c[7], ck = c[4];
    add(city, ck);
    const gi = city.indexOf("郡"), gk = ck.indexOf("グン");
    if (gi >= 0 && gk >= 0) add(city.slice(gi + 1), ck.slice(gk + 2));
  }
  return map;
}

function check(opts = {}) {
  const { names, table, words } = readMaster();
  const extra = (opts.add || []).map(s => { const [a, b] = s.split("="); return { from: a, to: b, extra: true }; });
  const rules = [...table, ...extra];
  const postalPath = opts.postal || process.env.HNS_POSTAL;
  const postal = postalPath && fs.existsSync(postalPath) ? readPostal(postalPath) : null;
  const hits = [];
  for (const n of names) {
    const why = [];
    // 単語の表の言葉（高原・平野・黒潮 など）は字の表より先に当たるので、その部分は字として見ない
    let realChars = n.base, ficChars = n.fic;
    for (const w of words) { realChars = realChars.split(w.from).join("〓"); ficChars = ficChars.split(w.to).join("〓"); }
    for (const r of rules) {
      if (realChars.includes(r.from) && ficChars.includes(r.from) && !realChars.includes(r.to)) why.push({ code: r.extra ? "ADD" : "R1", text: `${r.from}→${r.to} の ${r.from} が残る` + (r.forward ? "（この行は「これから作る名の既定」。決まった名は例外の筋）" : "") });
    }
    for (const [d, big] of Object.entries(DIGIT)) {
      for (let k = n.fic.indexOf(d); k >= 0; k = n.fic.indexOf(d, k + 1)) {
        if (!n.base.includes(d)) break;
        if (KEEP_AFTER.test(n.fic.slice(k + 1, k + 3).replace(/[一二三四五六七八九十百千万]/g, ""))) continue;
        why.push({ code: "R2", text: `数の字 ${d}（大字 ${big}）が残る` });
        break;
      }
    }
    if (postal && n.yomi && postal.has(n.base)) {
      const real = [...postal.get(n.base)];
      const fy = toKata(n.yomi.replace(/[（(].*$/, ""));
      if (real.some(rk => seion(rk) === seion(fy))) why.push({ code: "R3", text: `読み ${n.yomi} が現実の ${n.base}（${real.join("・")}）と同じ（濁りを除いて）` });
    }
    // R4：名の後ろ（市・町・村・区・郡）の読みを除いた芯の拍が 5 以上で、現実の芯の拍より増えたもの
    if (postal && n.yomi && postal.has(n.base)) {
      const suf = { "市": ["シ"], "町": ["マチ", "チョウ"], "村": ["ムラ", "ソン"], "区": ["ク"], "郡": ["グン"] };
      const tail = suf[n.base.slice(-1)] || [];
      const core = k => { for (const s of tail) if (k.endsWith(s)) return k.slice(0, -s.length); return k; };
      const fy = core(toKata(n.yomi.replace(/[（(].*$/, "").replace(/[・\s]/g, "")));
      const ry = Math.min(...[...postal.get(n.base)].map(k => morae(core(k)).length));
      const fm = morae(fy).length;
      if (fm >= 5 && fm > ry) why.push({ code: "R4", text: `芯の拍 ${fm}（現実 ${ry}）` });
    }
    // R5：川の名の終わりの 川 は替えない（単語の表、7afc576）。現実の名が 川 で終わり、作中の名が 川 で終わらないもの
    //     正本の rivers の節の行だけを見る（石川・香川 のような地名の 川 は当てない。C5 の査読 2026-10-25）
    if (n.sub === "rivers" && n.base.endsWith("川") && !n.fic.endsWith("川")) why.push({ code: "R5", text: `川の名の終わりの 川 が ${n.fic.slice(-1)} になっている` });
    if (why.length) hits.push({ ...n, why });
  }
  return { names, table, hits, postal: !!postal, postalPath };
}

function report(opts) {
  const { names, table, hits, postal, postalPath } = check(opts);
  const out = [];
  const say = s => out.push(s);
  const by = code => hits.filter(h => h.why.some(w => w.code === code));
  say(`■ 決まりの棚卸し（正本の採用の行 ${names.length} 名、字の表 ${table.length} 行${opts.add && opts.add.length ? `、足す案 ${opts.add.join("・")}` : ""}）`);
  const codes = [["R1", "字の表の字が残る"], ["R2", "数の字が大字にならず残る"], ["R3", "読みが現実とまるごと同じ"], ["R4", "5 拍以上"], ["R5", "川の名の終わりの 川 が替わっている（rivers の節）"], ["ADD", "足す案で新しく当たる"]];
  for (const [c, label] of codes) {
    if (c === "ADD" && !(opts.add && opts.add.length)) continue;
    if (c === "R3" && !postal) { say(`- R3 ${label}：郵便番号データが渡されていないので見ていない`); continue; }
    const h = by(c);
    say(`- ${c} ${label}：${h.length} 名（うち notes などに「例外」とある名 ${h.filter(x => x.exception).length}）`);
  }
  const show = opts.reason ? by(opts.reason) : (opts.add && opts.add.length ? by("ADD") : hits);
  if (opts.list || opts.reason || (opts.add && opts.add.length)) {
    say("");
    for (const h of show) say(`- 正本:${h.line}［${h.section}］${h.real} → ${h.fic}${h.yomi ? `（${h.yomi}）` : ""}${h.exception ? "［例外の書きあり］" : ""}：${h.why.filter(w => !opts.reason || w.code === opts.reason).map(w => w.code + " " + w.text).join("／")}`);
  }
  say("\n== 引いた範囲");
  say(`- 正本 data/hns_admin_division_master.yaml の採用の行（real と作中の名があるもの）`);
  say(`- 郵便番号データ：${postal ? path.basename(postalPath) + "（ファイルの日付 " + fs.statSync(postalPath).mtime.toISOString().slice(0, 10) + "）。小字・集落は含まない" : "渡されていない"}`);
  say("- 当たりは「決まりに合わないかもしれない名」。字の並びで見ているので、名ごとに確かめる（決めた名は動かさない）");
  return out.join("\n");
}

module.exports = { check, report };

if (require.main === module) {
  const args = process.argv.slice(2);
  const opts = { add: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--postal") opts.postal = args[++i];
    else if (args[i] === "--add") opts.add.push(args[++i]);
    else if (args[i] === "--list") opts.list = true;
    else if (args[i] === "--reason") opts.reason = args[++i];
  }
  console.log(report(opts));
}
