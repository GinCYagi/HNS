【HNS】査読｜航空会社の符号 HE・HL の見直し（提案 docs/proposals/2026-10-23_iata_h_codes_survey.md、84799c5）（HNS-C5）

作成：2026-10-23（HNS-C5）
頼み：HNS-M4 と HNS-G5（同じ頼み。一つにまとめて書く）。
立場：見立てのみ。採否は Gin、登録は HNS-M4。
道具：Wikipedia API（UA "HNS-review/0.1 (gin project)"、間を 5 秒あけた。2026-10-23 に引いた）。データ一式のダウンロードはしていない。aruljohn.com と IATA の公式の一覧は C5 では見ていない。

---

## 1. 照らしの漏れ
| 項目 | 照らした結果 | 出典 |
|---|---|---|
| **HL**（「航空会社の持ち主なし」） | **漏れがある**。**Hellenic Airlines**（ギリシャ、1947〜1951年、ICAO HLN）が IATA の HL を持っていた。75 年前になくなった会社で、いまの持ち主ではない。一覧①（List of airline codes）に載っていないのは、一覧のほうの漏れとみられる。困りはごく小さい（今はない会社）が、「航空会社の持ち主が一度もない」とは言えない。直す言い方：「いまの航空会社の持ち主なし（1951年になくなった Hellenic Airlines が持っていた）」 | en.wikipedia「Hellenic Airlines」の infobox（IATA = HL、founded 1947、ceased 1951）。全文検索 `insource:/IATA *= *HL[^A-Z]/` で 1 件 |
| HD＝AIRDO | **合う**（IATA HD、ICAO ADO） | en.wikipedia「Air Do」の infobox |
| HC＝Air Senegal | **合う**（IATA HC、ICAO SZN、2016年設立・2018年運航開始） | en.wikipedia「Air Senegal」の infobox |
| HW＝North-Wright Airways | **合う**（IATA HW、ICAO NWL） | en.wikipedia「North-Wright Airways」の infobox |
| 6か月で別の会社に回せる、controlled duplicate は行き先が重なりそうにない地方の会社 | **合う**。「IATA can make the code available for reuse after six months and can issue "controlled duplicates". Controlled duplicates are issued to regional airlines whose destinations are not likely to overlap」 | en.wikipedia「Airline codes」 |
| aruljohn.com の * を controlled duplicate と読んだこと | **C5 では確かめられない**【要照合】。サイトに印の説明がなければ推し量り。HD* が AIRDO（日本）とイラクの会社の二社なのは、controlled duplicate の読みと合う（地方の会社どうし、行き先が重ならない）。一つの手がかりにはなるが、言い切らないほうがよい | — |
- **照らし方の漏れ（一般）**：一覧①は「今の会社の名」の順に並ぶ一覧で、なくなった会社がすべて載るわけではない。HL の例のとおり、**符号そのもので全文を検索する**（`insource:` で IATA の欄を探す）と、一覧から漏れた過去の持ち主が見つかる。候補を決める前に、推す符号（HL・HC・HW）は全文検索をかけるのを推す。C5 は HL だけかけた。HC・HW は、今の持ち主以外の過去の持ち主を C5 は見ていない【要照合】。

## 2. 困りの小さい順の並べ方
- 物差し（検索で実在の会社が出て結びつくか、日本の路線で見えるか）は筋が通る。
- 順の 1 の HL は、過去の持ち主（Hellenic Airlines）があっても、いまの困りは変わらず小さい。**1 のまま**でよいと見る。
- 順の 2 の H0：「英字＋0 の形を IATA が出すか」がわからないものを 2 に置くのは、作中で現実に出ない形を使う心配がある。順位から外して「形が出るか確かめてから」にするのを推す。
- 順の 3〜6（HW・HK・HM・HC）：どれも東アジアに飛ばない会社。HM・HC は**国の会社（国を代表する会社）**で、HW・HK は地方の小さな会社。検索で目立つかの点で、G5 の並べ方（HW・HK を上）に賛成。

## 3. Air HinoMoto の推し HC／HW
- 現実の NH は「**N**ippon **H**elicopter」（国の名の頭＋Helicopter の頭）。これをそのまま移すと **HH**（Hinomoto Helicopter）で、Qanot Sharq と重なる（順 8）。
- **HC**（**H**eli**C**opter）は、国の名の頭（H）を落とし、Helicopter だけから二字を取る形。現実の NH の作りとは少し違う。ただ、Hinomoto も Helicopter も H で始まるので、「H は Hinomoto とも Helicopter とも読める」と書き添えれば筋は立つ。
- **HW** は由来が作りにくい（G5 のとおり）。
- C5 の見立て：**HC を推す G5 に賛成**。困りは HW より少し大きいが（セネガルの国の会社）、東アジアに飛ばない。由来がすっきり書けることを重く見る。HW を採るなら、由来の作り（前身の名を足す）を Gin に決めてもらう要がある。どちらにするかは Gin。

## 4. 日ノ本エアシステム（Hapan Air System）の HSY
- 提案の §7 の付け足し（2026-10-23_hinomoto_hi_kanji.md）に、ICAO の HSY はスペインの Sky Helicopteros が使っている（airhex.com・sprinkle.com、M4 の照らし）とある。C5 はこの二つのサイトを見ていない【要照合】。
- 扱い：同じやり方（二つ以上の一覧と、各社の記事、符号そのものでの全文検索）で、ICAO の 3 字と IATA の 2 字の両方を調べ直すのに賛成。IATA の 2 字は H の字にこだわらない（現実の JAS は JD）、という G5 の書き方にも賛成。

## 5. M4 の案「どの符号でも画面に HE を大きく映さない、HL は出してよい」
- 賛成。HL を出してよいのは、いまの持ち主の航空会社がいないから（Hellenic Airlines は 1951 年になくなった）。

## 6. まとめ（見立て）
- 一覧の照らしはおおむね合う（HD・HC・HW と、決まりの言い分は C5 も確かめた）。
- **漏れが一つ**：HL には過去の持ち主 Hellenic Airlines（1947〜1951）がある。困りは小さく、順位は変わらない。言い方を「いまの持ち主なし」に直す。
- 照らし方の足し：推す符号は、一覧に加えて**符号そのものでの全文検索**をかける。
- Air HinoMoto は HC を推す（G5 に賛成）。H0 は順位から外して、形が出るか確かめてから。
