"""
全国の町名（郵便番号の町域）を、いまの決まりで仕分けて数える。
  python3 -I scripts/town_survey.py <utf_ken_all.csv> <出力の .sqlite> [--line 30]

仕分け（上から順に当てる）
  decided       正本で決まり済み（towns_ryuto_chuo）
  keep_ri       替えない字（町・東西南北・上中下・数）だけでできている（DIFF-026）
  keep_common   全国によくある名前、件数が線以上（DIFF-027。線は Gin が未決、既定 30）
  keep_era      元号（DIFF-023 の改め）
  keep_noun     施設・役目を言う普通の名詞（DIFF-035 の追記）
  keep_deity    神仏の名（DIFF-035）。由来の確かめが要る名は deity_check に分ける（DIFF-037）
  derived_full  決まった名前を含み、残りも替えない字・よくある名前だけ（DIFF-032、置き換えるだけで決まる）
  derived_part  決まった名前を含むが、残りに新しい名前が要る
  new           新しい名前が要る（Gin の承認が要る）
郵便番号データはリポジトリに入れない。出力の sqlite もリポジトリの外に置く。
"""
import csv, re, sqlite3, sys, os, json
from collections import Counter, defaultdict

args = sys.argv[1:]
line = 30
if '--line' in args:
    i = args.index('--line'); line = int(args[i + 1]); del args[i:i + 2]
postal, out = args[0], args[1]
base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
master = open(os.path.join(base, 'data', 'hns_admin_division_master.yaml'), encoding='utf-8').read()

# ---- 正本から：決まった現実の名 → 日ノ本の名（採用のものだけ）
def adopted_pairs(text):
    pairs = []
    for l in text.split('\n'):
        r = re.search(r'real: "([^"]*)"', l); f = re.search(r'fictional: "([^"]*)"', l)
        v = re.search(r'verdict: "([^"]*)"', l)
        if r and f and v and v.group(1).startswith('採用'):
            pairs.append((r.group(1), f.group(1), l))
    return pairs
pairs = adopted_pairs(master)
ryuto_start = master.index('towns_ryuto_chuo:')
decided_towns = {r for r, f, l in adopted_pairs(master[ryuto_start:])}

def clean_real(r):
    r = re.sub(r'[（(].*?[)）]', '', r).strip()
    return r
# 中継局の名は局の名で、地名の決まりではないので外す
def drop_block(text, start):
    i = text.find(start)
    if i < 0:
        return text
    j = text.find('\n  ', i + 1)
    while j >= 0 and text[j + 3] in ' -':
        j = text.find('\n  ', j + 1)
    return text[:i] + (text[j:] if j >= 0 else '')
place_text = drop_block(drop_block(master, '  bsr_relay_stations:'), '  tuf_relay_stations:')
keys = {}
for r, f, l in adopted_pairs(place_text):
    r2, f2 = clean_real(r), clean_real(f)
    for suf in ('県', '府', '市', '町', '村', '区'):
        if r2.endswith(suf) and f2.endswith(suf) and len(r2) > 2:
            r2, f2 = r2[:-1], f2[:-1]
            break
    if len(r2) >= 2 and r2 != f2 and not re.search(r'[局駅線道路橋城]$', r2) and '中継' not in r2:
        keys.setdefault(r2, f2)
# 長い名から先に当てる
keylist = sorted(keys, key=len, reverse=True)

RI = set('町東西南北上中下一二三四五六七八九十百千〇０１２３４５６７８９0123456789丁目番条第区号')
ERAS = set('''大化 白雉 朱鳥 大宝 慶雲 和銅 霊亀 養老 神亀 天平 天平勝宝 天平宝字 天平神護 神護景雲 宝亀 天応 延暦 大同 弘仁 天長 承和 嘉祥 仁寿 斉衡 天安 貞観 元慶 仁和 寛平 昌泰 延喜 延長 承平 天慶 天暦 天徳 応和 康保 安和 天禄 天延 貞元 天元 永観 寛和 永延 永祚 正暦 長徳 長保 寛弘 長和 寛仁 治安 万寿 長元 長暦 長久 寛徳 永承 天喜 康平 治暦 延久 承保 承暦 永保 応徳 寛治 嘉保 永長 承徳 康和 長治 嘉承 天仁 天永 永久 元永 保安 天治 大治 天承 長承 保延 永治 康治 天養 久安 仁平 久寿 保元 平治 永暦 応保 長寛 永万 仁安 嘉応 承安 安元 治承 養和 寿永 元暦 文治 建久 正治 建仁 元久 建永 承元 建暦 建保 承久 貞応 元仁 嘉禄 安貞 寛喜 貞永 天福 文暦 嘉禎 暦仁 延応 仁治 寛元 宝治 建長 康元 正嘉 正元 文応 弘長 文永 建治 弘安 正応 永仁 正安 乾元 嘉元 徳治 延慶 応長 正和 文保 元応 元亨 正中 嘉暦 元徳 元弘 正慶 建武 延元 興国 正平 建徳 文中 天授 弘和 元中 暦応 康永 貞和 観応 文和 延文 康安 貞治 応安 永和 康暦 永徳 至徳 嘉慶 康応 明徳 応永 正長 永享 嘉吉 文安 宝徳 享徳 康正 長禄 寛正 文正 応仁 文明 長享 延徳 明応 文亀 永正 大永 享禄 天文 弘治 永禄 元亀 天正 文禄 慶長 元和 寛永 正保 慶安 承応 明暦 万治 寛文 延宝 天和 貞享 元禄 宝永 正徳 享保 元文 寛保 延享 寛延 宝暦 明和 安永 天明 寛政 享和 文化 文政 天保 弘化 嘉永 安政 万延 文久 元治 慶応 明治 大正 昭和 平成 令和'''.split())
# 施設・役目を言う普通の名詞（DIFF-035 の追記の例から広げた。一覧そのものは Gin の確かめが要る）
# 地形の一字（山・川・田・野ほか）は入れない（DIFF-028：山体でない地名の山は替える。ほかの地形の字も同じ扱いかは未決）
NOUNS = set('''駅前 駅南 駅北 駅東 駅西 駅 中央 本 新 元 港 市場 学校 学園 大学 水道 医学 寄附 公園 団地 工業団地 工業 流通 流通団地 卸 卸団地 空港 役場 役場前 市役所 城内 城下 本郷 新田 新開 開発 駅通 本通 大通 中通 横 横町 裏 表 前 後 奥 外 内 新地 今町 元町 本町通 新町通'''.split())
DEITY = set('天神 弁天 弁財天 稲荷 八幡 愛宕 白山 毘沙門 不動 観音 薬師 地蔵 権現 明神 神明 大日 天王 天満 秋葉 金比羅 琴平 山王 日吉 大黒 荒神 天神前 八幡前 稲荷前 神明前 観音寺 薬師堂 不動堂 地蔵堂 天満宮'.split())
DEITY_CHECK = set('恵比寿 恵美須 戎 蛭子 住吉 春日 熊野 諏訪 浅間 八坂 祇園 鹿島 香取 三島 白鬚 白髭 富士見 出雲 伊勢 天照 大神宮 太子'.split())

def norm_town(t):
    if t == '以下に掲載がない場合' or 'の次に番地がくる場合' in t or '番地' in t and t.startswith('（'):
        return None
    if '）' in t and '（' not in t:
        return None
    t = re.sub(r'（.*?）', '', t)
    t = t.split('（')[0]
    t = re.sub(r'一円$', '', t)
    t = re.sub(r'^大字', '', t)
    return t.strip() or None

def core_of(t):
    return ''.join(ch for ch in t if ch not in RI)

rows = []
with open(postal, encoding='utf-8') as f:
    for c in csv.reader(f):
        pref, city, town, kana = c[6], c[7], c[8], c[5]
        b = norm_town(town)
        if not b:
            continue
        rows.append((pref, city, b, kana))
uniq = {}
for pref, city, b, kana in rows:
    uniq.setdefault((pref, city, b), kana)
names = Counter(b for (p, c, b) in uniq)

def classify(pref, city, b):
    if city == '新潟市中央区' and b in decided_towns:
        return 'decided', '正本', ''
    core = core_of(b)
    if not core:
        return 'keep_ri', 'DIFF-026', b
    if names[b] >= line:
        return 'keep_common', 'DIFF-027', b
    if core in ERAS or any(core == e + s for e in ERAS for s in ('通', '台', '新田')):
        return 'keep_era', 'DIFF-023', b
    if core in DEITY:
        return 'keep_deity', 'DIFF-035', b
    if core in DEITY_CHECK:
        return 'deity_check', 'DIFF-037', b
    if core in NOUNS:
        return 'keep_noun', 'DIFF-035', b
    # 自分の市区町村・府県の名を含むものだけ（DIFF-037：ほかの所の同じ字は由来が違いうる）
    own = [k for k in keylist if k in city or k in pref]
    for k in own:
        if k in b:
            after = b.replace(k, keys[k])
            rest = core_of(b.replace(k, ''))
            if not rest or rest in NOUNS or rest in ERAS or rest in DEITY or names.get(b.replace(k, ''), 0) >= line:
                return 'derived_full', 'DIFF-032', after
            return 'derived_part', 'DIFF-032', after
    return 'new', '', ''

if os.path.exists(out):
    os.remove(out)
db = sqlite3.connect(out)
db.execute('create table towns(pref text, city text, town text, kana text, national_count int, core text, category text, rule text, proposed text)')
cnt = Counter(); by_pref = defaultdict(Counter)
for (pref, city, b), kana in uniq.items():
    cat, rule, prop = classify(pref, city, b)
    cnt[cat] += 1; by_pref[pref][cat] += 1
    db.execute('insert into towns values (?,?,?,?,?,?,?,?,?)', (pref, city, b, kana, names[b], core_of(b), cat, rule, prop))
# 市区町村の段
db.execute('create table munis(pref text, city text, ward text, category text, proposed text)')
mcnt = Counter()
city_pairs = {clean_real(r): clean_real(f) for r, f, l in pairs if re.search(r'[市町村区]$', clean_real(r))}
seen_heads = set()
for pref, city in sorted({(p, c) for (p, c, b) in uniq}):
    m = re.match(r'^(.+?市)(.+区)$', city)
    g = re.match(r'^(.+?郡)(.+[町村])$', city)
    head, ward = (m.group(1), m.group(2)) if m else ((g.group(2) if g else city), '')
    if ward:
        wc = core_of(ward[:-1])
        cat = 'ward_keep_ri' if not wc else ('ward_keep_deity' if wc in DEITY or wc in DEITY_CHECK else ('ward_keep_noun' if wc in NOUNS else 'ward_new'))
        mcnt[cat] += 1
        db.execute('insert into munis values (?,?,?,?,?)', (pref, city, ward, cat, ''))
        if (pref, head) in seen_heads:
            continue
    if (pref, head) in seen_heads:
        continue
    seen_heads.add((pref, head))
    if head in city_pairs:
        cat = 'decided'
    elif not core_of(head[:-1] if head[-1] in '市町村' else head):
        cat = 'keep_ri'
    elif core_of(head[:-1]) in ERAS:
        cat = 'keep_era'
    else:
        cat = 'new'
    mcnt[cat] += 1
    db.execute('insert into munis values (?,?,?,?,?)', (pref, city, ward, cat, city_pairs.get(head, '')))
db.commit()
sens = {}
for L in (10, 20, 30, 50, 100):
    sens[L] = sum(1 for (p, c, b) in uniq if core_of(b) and names[b] >= L)
print(json.dumps({'towns_total': len(uniq), 'towns': cnt, 'munis_total': sum(mcnt.values()), 'munis': mcnt,
                  'diff027_line_sensitivity': sens, 'keys': len(keys), 'line': line,
                  'by_pref': {p: dict(v) for p, v in by_pref.items()}}, ensure_ascii=False, default=dict))
