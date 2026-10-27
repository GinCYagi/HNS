【HNS】Proposal｜HNS-G5 より HNS-M4・HNS-C5・Gin への文（同じ音の言葉を引く道具：weblio に替えて ja.wiktionary の API）

作成：2026-10-27（HNS-G5）
もと：HNS-M4 の頼み（Gin「イ」：API が使ってよいと書いてある辞書に替える。先に規約を確かめ、足りない分は人がブラウザで引く）。
前の道具：homo.py（weblio を取得していた。2026-10-27 から止めた、docs/reviews/2026-10-27_tool_terms_check_G5.md）。
**動かすのは、User-Agent の連絡先を Gin が決めてから**（M4）。この文は案だけで、道具はまだ作っていない。

## 1. 規約（2026-10-27 に読んだ）
| 何 | 本文（原文） | 出典 |
|---|---|---|
| 中身の使用許諾 | CC BY-SA 4.0・GFDL（M4 が確かめた） | https://ja.wiktionary.org/wiki/Wiktionary:著作権 |
| 自動の利用 | 禁じているのは "automated uses of the Project Websites that are abusive or disruptive of the services" と "placing an undue burden on an API, Project Website or the networks or servers"（第4節）。API は "you agree to abide by all applicable policies governing the use of the APIs"（第12節）。商業の利用を禁じる文は、中身については無い（"these licenses do allow commercial uses"、第7節） | https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use （施行 2023-06-07、ページの最終更新 2026-10-25） |
| API の作法 | 直列で送る "Making your requests in series rather than in parallel"。ratelimited が出たら間をあける。人が待っていない処理では maxlag をつける。"API requests to Wikimedia wikis must include a meaningful User-Agent header."。同じ問い合わせはキャッシュする | https://www.mediawiki.org/wiki/API:Etiquette （最終更新 2026-05-13） |
| User-Agent | 連絡先（メール・ウェブサイト・ウィキの利用者名のどれか）を入れる。汎用の名は 403 か止められる（M4 が確かめた） | https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy |

G5 の読み：名一つにつき数回、直列で、キャッシュしながら引くなら、規約の「負荷」「妨げ」には当たらない（見立て）。

## 2. 道具の形（案）
- 名の読み（例 もご・もぜん）ごとに、次の二つを **直列で** 引く。間は 1 秒以上あける。結果は手元にキャッシュし、同じ読みは二度引かない。
  1. **かなの見出し**：ja.wiktionary には「ふさい」「ほご」のような、かなの見出しのページに同じ音の漢字の語を並べたものがある。`action=query&titles=<読み>&prop=revisions` で、そのページの見出し語（漢字の語）だけを取り出す。
  2. **読みでの検索**：かなの見出しが無い読み（例 みぜん）は、漢字のページの中に読みが書いてある（未然 のページに みぜん）。`action=query&list=search&srsearch="<読み>"&srnamespace=0` で、読みを本文に含むページの題を取る。
- 出すのは **見出し語と URL だけ**。説明の文は取り込まない・記録に写さない（コトバンクと同じ決め）。
- User-Agent：`HNS-homophone-check/0.1 (<Gin が決める連絡先>)`。maxlag=5 をつける。
- 一緒に、今の lookup（郵便番号データ・常用漢字表）の照らしはそのまま使う。

## 3. weblio と比べて足りない分の見立て（2026-10-27、ブラウザと同じ形で一つずつ見た、10 語）
| これまで weblio で当たったもの | かなの見出し | 漢字のページ | 当たるか |
|---|---|---|---|
| 府砦＝負債（ふさい） | あり（夫妻・負債・不才・付載・府債） | — | ○ |
| 穂後＝保護（ほご） | あり（保護・補語・反故） | — | ○ |
| 富前＝不全（ふぜん） | あり（不善・不全 ほか 7） | — | ○ |
| 阡島＝戦闘（せんとう） | あり（戦闘 ほか 7） | — | ○ |
| 涯州＝外周・鎧袖（がいしゅう） | あり | — | ○ |
| 涯端＝慨嘆・骸炭（がいたん） | あり | — | ○ |
| 実前＝未然（みぜん） | **なし** | 未然 に みぜん とある | ○（検索で 未然、2026-10-27 に試した） |
| 裏州＝履修（りしゅう） | **なし** | 履修 に りしゅう とある | 検索なら当たる見込み（同上） |
| 茂後＝婿（もご、津軽の方言） | **なし** | 婿 に もご は無い（訓は むこ だけ） | × |
| 北望＝北邙（ほくぼう） | **なし** | 北邙 のページも無い | × |

- 見立て：ふだん使う言葉（負債・保護・戦闘 など）は、かなの見出しでほぼ当たる。読みでの検索を足せば、見出しの無い読みもある程度拾える。**方言・古い言葉・故事の言葉（もご＝婿、北邙）は当たらない**。10 語のうち、かなの見出しで 6、検索を足して 8（未然 は試して当たった、履修 は見込み）、2 は当たらない。数が少ないので、割合は目安にとどめる。
- 足りない分は、Gin の決めのとおり **人がブラウザで weblio などを引く**。とくに、方言や古い言葉に重なりそうな読み（2 拍の短い名・〇後・〇前）は、人の目で見る。

## 4. ほかに使ってよい辞書（候補）
| 辞書 | 本文（原文） | 出典 | 気がかり |
|---|---|---|---|
| **JMdict**（和英辞書、読みと漢字の語の対が約 20 万） | "The dictionary files are made available under a Creative Commons Attribution-ShareAlike Licence (V4.0)." "there is NO restriction placed on commercial use of the files." 使ったときは出典を示す（"acknowledge the usage and source of the files"） | https://www.edrdg.org/edrdg/licence.html （ページに日付なし、2026-10-27 に読んだ） | **ファイルを手元に置く（ダウンロード）必要がある**。取るなら、そのとき Gin に聞く。手元で引くので外への負荷が無く、読みからの引きが速い。方言（もご）や 北邙 が入っているかは確かめていない |

- G5 の推し：**ウィクショナリーの API（2.）を先に**、連絡先が決まったら使う。JMdict は、Gin がダウンロードしてよいと言えば足す（読みの引きはこちらの方が漏れが少ないと見込む、確かめていない）。

## 5. 作ったもの（scripts/homophone_wiktionary.py、名乗りは Gin の決め 2026-10-27 `HNS-lookup/0.1 (ja.wiktionary; User:Dcmick)`）
- 試した結果（2026-10-27、3 読み）：ふさい → かなの見出し 夫妻・負債・不才・付載・附載・府債。みぜん → かなの見出しなし、検索で **未然**・未然形。検索はあいまいに当たる（ふさい で 鬱陶・切腹 なども出る）ので、検索の結果は「候補、人が見る」とする。
- **4 読み目の検索で 429（多すぎる）が返った**（間 1.5 秒、6 回目の問い合わせ）。そこで止め、間を 5 秒に広げ、429 のときは Retry-After（60 秒以上）待って一度だけやり直し、二度目は止める形に直した。直した形ではまだ動かしていない。
- 一度に引くのは、一つの案の読み（多くて 10 ほど）までにする。

## 6. 確かめていないこと
- 読みでの検索が 履修 を返すか（りしゅう は引いていない）。
- JMdict の中身（方言・故事の言葉がどれだけ入るか）。
