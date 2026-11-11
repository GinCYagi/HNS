# TUF（テレビユー福島）のデジタル中継所ごとの「同じ場所の放送局」と空中線電力（2026-10-11）

ALM（アニメ制作側）が 3D で鉄塔の形を作るための資料。名前は現実の局名のまま（日ノ本の名への置き換えは別の仕事）。同じ内容の JSON：`docs/references/2026-10-11_tuf_relay_colocation.json`（キーは `2026-10-08_tuf_digital_tree.json` の name）。

## まとめ
- **デジタル**：69局すべてで、総務省の免許の表に NHK総合・NHK教育・FTV・FCT・KFB・TUF の6社が**同じ中継局名で並び、空中線電力も6社同じ**（＝6社同居。表は2013-12-19現在）。TUF の ch・出力は木の値と69局すべて一致。
  - ただし表は「同じ中継局名の免許」で、塔が1本か、6社がそれぞれの塔かまでは書いていない。ふくしまFM の表には「福島テレビと送信柱共用」（笹森山・原町）、「NHK-FM・NHKテレビと送信柱共用」（会津若松・いわき・白河）とあり、塔の共用の手がかりになる。
  - 民放4社が NHK より後から入った局：磐城西郷（2012-05-28）・東常葉（2012-12-19）・岩代（2013-01-29）・大久（2013-03-27）。木の start は この4局で NHK の日付になっている（東常葉は「2012年10月」）。
- **アナログ**：資料で映像・音声とも分かった局 26、映像だけ分かり音声を比（4：1）から見積もった局 41、アナログ局なし・不明 2。
  - アナログの VHF：UHF の比での見積もりは**使っていない**（VHF・UHF とも資料に値があった）。資料の値では VHF：UHF は 1：10（笹森山 3kW：30kW、富岡 10W：100W）、1：5（会津若松）、1：3（柳津三島など）、1：1（原町）など局ごとに違う。
  - アナログとデジタルが同じ場所かは、同じ記事に書かれている局・座標が近い局のほかは「未確認」と書いた。**いわき南（湯ノ岳）はアナログ VHF だけ中腹の約500m 離れた所**。
- **FM**：NHK-FM・ふくしまFM・rfc ラジオ福島 FM補完の中継局が同じ場所にあるのは 福島・会津若松・いわき北・いわき南（NHK-FM は中腹のアナログ VHF の側かもしれない、コミュニティFM は山頂）・原町・白河・富岡・田島・只見・東只見・東金山・西金山・塙・柳津三島・月舘・南郷（ほかに小野は場所が未確認、昭和は不明、金山は**別の場所**）。AM は同居の記録なし。
- **塔の写真**：Commons に 笹森山（送信所アンテナ群）・背炙山（塔群全景）・矢大臣山（アンテナ群）・米山（塙中継局）・棚倉富岡 などがある（下の表。写真の中身はまだ見ていない、キャプションからの一言）。

## 出どころ
- S：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
- D：[denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
- NHKFM：[ja.wikipedia「NHK福島放送局」FM放送の中継局の表](https://ja.wikipedia.org/wiki/NHK%E7%A6%8F%E5%B3%B6%E6%94%BE%E9%80%81%E5%B1%80)
- FMF：[ja.wikipedia「エフエム福島」中継局の表](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%95%E3%82%A8%E3%83%A0%E7%A6%8F%E5%B3%B6)
- RFC：[ja.wikipedia「ラジオ福島」FM補完中継局の表](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%B8%E3%82%AA%E7%A6%8F%E5%B3%B6)
- ANA：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約）
- 各局の ja.wikipedia の記事（表の中にリンク）。座標の照合は `2026-10-06_tuf_analog_relays.md` の GSI の山頂の点と木の点の距離。

## 決まり（数字の読み方）
- デジタルの出力は空中線電力（W）。ERP は分かる局だけ添えた。
- アナログは「映像／音声」の空中線電力。**「比から見積もり」と付いた数字は資料の値ではない**（映像：音声＝4：1 で出した値）。
- denpa-data の「出力」は局ごとに VHF と UHF ひとつずつで、映像の出力とみられる（ja.wikipedia と合う局で確かめた）。

## 一覧（69局、木の順）

### 福島（総務省の局名：福島（親局））
- 場所：笹森山（福島市松川町水原）
- デジタル（6社同居、空中線電力 3kW）：NHK総合 15ch、NHK教育 14ch、FTV 25ch、FCT 27ch、KFB 29ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：NHK総合 2005年12月1日、NHK教育 2005年12月1日、FTV 2006年6月1日、FCT 2006年6月1日、KFB 2006年6月1日、TUF 2006年6月1日
  - デジタル ERP：NHK 30kW、FCT 38kW、KFB 41kW、TUF 38kW、FTV 39kW（ja.wikipedia「笹森山 (福島県)」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「笹森山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%AC%B9%E6%A3%AE%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)
  - NHK総合 9ch（VHF）映像3kW／音声750W、NHK教育 2ch（VHF）映像3kW／音声750W、FTV 11ch（VHF）映像3kW／音声750W、TUF 31ch（UHF）映像30kW／音声7.5kW、FCT 33ch（UHF）映像30kW／音声7.5kW、KFB 35ch（UHF）映像30kW／音声7.5kW
  - 場所の照合：同じ記事（笹森山）にデジタル・アナログとも記載。木の点と笹森山の山頂（GSI）は約0.3km
- FM：ふくしまFM（エフエム福島）親局 81.8MHz 空中線電力 1kW（[ja.wikipedia「笹森山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%AC%B9%E6%A3%AE%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)）。ERP 4.8kW。「福島テレビと送信柱共用」（ja.wikipedia「エフエム福島」）
- FM：NHK-FM 福島（親局） 85.3MHz 空中線電力 1kW（[ja.wikipedia「笹森山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%AC%B9%E6%A3%AE%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)）。ERP 4.9kW
- FM：rfc ラジオ福島 福島FM補完中継局 90.8MHz 空中線電力 500W（[ja.wikipedia「笹森山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%AC%B9%E6%A3%AE%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)）。ERP 1.3kW。郡山（黒石山）と同期放送
- FM：（過去）Jモバ福島中継局（V-High マルチメディア放送） 214.714286MHz 空中線電力 7.5kW（[ja.wikipedia「笹森山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%AC%B9%E6%A3%AE%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)）。2013-02-27〜2016-06-30。今はない
- 塔：[写真](https://commons.wikimedia.org/wiki/File:20091206%E7%AC%B9%E6%A3%AE%E5%B1%B1%E9%80%81%E4%BF%A1%E6%89%80.JPG) キャプション「送信所アンテナ群」（2009-12-06、Commons。中身は未見）
- 塔：[写真](https://commons.wikimedia.org/wiki/File:20091206%E7%AC%B9%E6%A3%AE%E5%B1%B1.JPG) 笹森山の全景（Commons。塔が写るかは未見）
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：FTV 福島放送局（VHF 11ch）は鉄塔 50.1m・スーパーターン6段。写真は山の上に鉄塔が何本も並ぶ。キャプションに「笹森山回転パラボラ」
- 注：ふくしまFM の送信柱は福島テレビと共用（ja.wikipedia「エフエム福島」の備考）。塔が局ごとに分かれているか全部で1本かは、資料からは分からない

### 会津若松（総務省の局名：会津若松）
- 場所：背炙山（会津若松市東山町湯本ほか）
- デジタル（6社同居、空中線電力 500W）：NHK総合 16ch、NHK教育 14ch、FTV 18ch、FCT 22ch、KFB 30ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2006年12月1日（6社）
  - デジタル ERP：NHK 2.3kW、FCT・KFB 2.9kW、TUF 2.8kW、FTV 3kW（ja.wikipedia「会津若松テレビ・FM中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「会津若松テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 1ch（VHF）映像1kW／音声250W、NHK教育 3ch（VHF）映像1kW／音声250W、FTV 6ch（VHF）映像1kW／音声250W、FCT 37ch（UHF）映像5kW／音声1.25kW、KFB 41ch（UHF）映像5kW／音声1.25kW、TUF 47ch（UHF）映像5kW／音声1.25kW
  - 場所の照合：同じ記事にデジタル・アナログ・FM とも「背炙山」。木の点と背炙山公園の点（GSI）は約0.3km
- FM：ふくしまFM 会津若松 82.8MHz 空中線電力 250W（[ja.wikipedia「会津若松テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 1.2kW。「NHK-FM・NHKテレビと送信柱共用」（ja.wikipedia「エフエム福島」）
- FM：NHK-FM 会津若松 85.9MHz 空中線電力 250W（[ja.wikipedia「会津若松テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 1.2kW
- FM：rfc ラジオ福島 若松FM補完中継局 90.8MHz 空中線電力 250W（[ja.wikipedia「会津若松テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 1.15kW。所在は湊町赤井字彦左衛門（背炙山）
- 塔：[写真](https://commons.wikimedia.org/wiki/File:%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80%E5%85%A8%E6%99%AF.jpg) キャプション「古川、湯川合流地点から撮影した塔群全景」＝塔が何本も並ぶ（Commons。中身は未見）
- 塔：[写真](https://commons.wikimedia.org/wiki/File:%E8%83%8C%E7%82%99%E5%B1%B101.JPG) キャプション「会津若松市街地側から。ピークはテレビ塔より奥にある」（Commons）
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：FTV 会津若松放送局（VHF 6ch）は鉄塔 45m・スーパーゲイン6段。写真では鉄塔のてっぺんに丸いパラボラが二つ
- 注：AM（NHK 第1・第2、rfc）は背炙山ではなく市内の別の場所（宮町・花見ヶ丘、ja.wikipedia「会津若松ラジオ中継局」）

### 飯舘（総務省の局名：飯舘）
- 場所：大火山（相馬郡飯舘村飯樋字大火）
- デジタル（6社同居、空中線電力 2W）：NHK総合 16ch、NHK教育 23ch、FTV 18ch、FCT 22ch、KFB 36ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年10月15日（6社）
  - デジタル ERP：6社とも 19.5W（ja.wikipedia「飯舘中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「飯舘中継局」](https://ja.wikipedia.org/wiki/%E9%A3%AF%E8%88%98%E4%B8%AD%E7%B6%99%E5%B1%80)
  - FTV 40ch（UHF）映像10W／音声2.5W、FCT 42ch（UHF）映像10W／音声2.5W、NHK総合 44ch（UHF）映像10W／音声2.5W、NHK教育 46ch（UHF）映像10W／音声2.5W、KFB 48ch（UHF）映像10W／音声2.5W、TUF 50ch（UHF）映像10W／音声2.5W
  - 場所の照合：同じ記事。木の点と大火山の山頂（GSI）は約0.02km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 滝根（総務省の局名：滝根（V））
- 場所：矢大臣山（田村市滝根町広瀬字矢大臣）
- デジタル（6社同居、空中線電力 3W）：NHK総合 41ch、NHK教育 37ch、FTV 42ch、FCT 46ch、KFB 47ch、TUF 44ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年11月12日（6社）
  - デジタル ERP：6社とも 75W（ja.wikipedia「滝根テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「滝根テレビ中継局」](https://ja.wikipedia.org/wiki/%E6%BB%9D%E6%A0%B9%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 23ch（UHF）映像10W／音声2.5W、NHK教育 49ch（UHF）映像8.8W／音声2.2W、NHK総合 51ch（UHF）映像8.8W／音声2.2W、FTV 57ch（UHF）映像8.8W／音声2.2W、FCT 59ch（UHF）映像10W／音声2.5W、KFB 61ch（UHF）映像10W／音声2.5W
  - 場所の照合：同じ記事に「矢大臣山」。木の点と山頂（GSI）は約0.02km
  - 注：デジタル・アナログとも垂直偏波
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔：[写真](https://commons.wikimedia.org/wiki/File:Mt_Yadaijin.JPG) 矢大臣山の山容（ja.wikipedia「滝根テレビ中継局」の写真。塔が写るかは未見）
- 塔：[写真](https://commons.wikimedia.org/wiki/File:%E5%B1%95%E6%9C%9B%E5%8F%B0%E3%81%8B%E3%82%89%E5%8C%97%E9%9D%A2%E3%81%AE%E3%82%A2%E3%83%B3%E3%83%86%E3%83%8A%E7%BE%A4.jpg) キャプション「展望台から北面のアンテナ群」（ja.wikipedia「矢大臣山」のギャラリー）。記事本文にも「アンテナ群」

### 原町（総務省の局名：原町）
- 場所：二ッ森山（南相馬市原町区高倉）
- デジタル（6社同居、空中線電力 10W）：NHK総合 15ch、NHK教育 14ch、FTV 25ch、FCT 27ch、KFB 29ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年12月1日（6社）
  - デジタル ERP：6社とも 93W（ja.wikipedia「原町テレビ・FM中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「原町テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E5%8E%9F%E7%94%BA%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 4ch（VHF）映像100W／音声25W、NHK総合 8ch（VHF）映像100W／音声25W、FTV 10ch（VHF）映像100W／音声25W、KFB 48ch（UHF）映像100W／音声25W、TUF 50ch（UHF）映像100W／音声25W、FCT 58ch（UHF）映像100W／音声25W
  - 場所の照合：同じ記事に「県域放送局…二ッ森山」（座標は未確認）
  - 注：ERP は NHK教育 510W、NHK総合・FTV 500W、UHF 3社 1.15kW
- FM：ふくしまFM 原町 78.6MHz 空中線電力 100W（[ja.wikipedia「原町テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E5%8E%9F%E7%94%BA%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 190W。「福島テレビと送信柱共用」（ja.wikipedia「エフエム福島」）
- FM：NHK-FM 原町 83.3MHz 空中線電力 30W（[ja.wikipedia「原町テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E5%8E%9F%E7%94%BA%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 49W
- FM：rfc ラジオ福島 原町FM補完中継局 90.2MHz 空中線電力 100W（[ja.wikipedia「原町テレビ・FM中継局」](https://ja.wikipedia.org/wiki/%E5%8E%9F%E7%94%BA%E3%83%86%E3%83%AC%E3%83%93%E3%83%BBFM%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 390W
- 塔の写真・記述：なし（見つからなかった）
- 注：AM（NHK・rfc の原町）は別の場所（原町区馬場・上北高平、ja.wikipedia「原町ラジオ中継局」）

### 白河（総務省の局名：白河）
- 場所：富士見山（白河市）
- デジタル（6社同居、空中線電力 10W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 17ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年12月1日（6社）
  - デジタル ERP：6社とも 27W（ja.wikipedia「白河中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「白河中継局」](https://ja.wikipedia.org/wiki/%E7%99%BD%E6%B2%B3%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 44ch（UHF）映像100W／音声25W、KFB 46ch（UHF）映像100W／音声25W、FCT 56ch（UHF）映像100W／音声25W、NHK教育 58ch（UHF）映像100W／音声25W、NHK総合 60ch（UHF）映像100W／音声25W、FTV 62ch（UHF）映像100W／音声25W
  - 場所の照合：同じ記事に「富士見山」。木の点と山頂（GSI）は約0.01km
  - 注：FTV の白河はアナログで全局 UHF（FTV 初の UHF 局）
- FM：ふくしまFM 白河 79.8MHz 空中線電力 100W（[ja.wikipedia「白河中継局」](https://ja.wikipedia.org/wiki/%E7%99%BD%E6%B2%B3%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 87W（「エフエム福島」の表は 97.7W）。「NHK-FM・NHKテレビと送信柱共用」
- FM：NHK-FM 白河 84.3MHz 空中線電力 100W（[ja.wikipedia「白河中継局」](https://ja.wikipedia.org/wiki/%E7%99%BD%E6%B2%B3%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 89W
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：昭和40年の FTV 白河は全国初のプレハブ局舎・支柱式鉄パイプ（鉄塔の形の手がかり、ただしアナログ開局時）
- 注：東日本大震災で「白河中継局は鉄塔が倒壊」（ja.wikipedia「エフエム福島」、ふくしまFM の停波の記述）。今の塔は建て直しとみられる（未確認）

### 富岡（総務省の局名：富岡）
- 場所：郭公山の西北の高地（双葉郡楢葉町井出）
- デジタル（6社同居、空中線電力 10W）：NHK総合 16ch、NHK教育 33ch、FTV 18ch、FCT 22ch、KFB 35ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年12月1日（6社）
  - デジタル ERP：6社とも 100W（ja.wikipedia「富岡中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「富岡中継局」](https://ja.wikipedia.org/wiki/%E5%AF%8C%E5%B2%A1%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 2ch（VHF）映像10W／音声2.5W、NHK総合 9ch（VHF）映像10W／音声2.5W、FTV 11ch（VHF）映像10W／音声2.5W、TUF 30ch（UHF）映像100W／音声25W、FCT 38ch（UHF）映像100W／音声25W、KFB 40ch（UHF）映像100W／音声25W
  - 場所の照合：記事に「所在地：デジタルテレビ放送に同じ」（アナログ・FM とも）。木の点と郭公山の山頂（GSI）は約3km だが、局は郭公山の西北の高地なので山頂とは別（局の座標は未確認）
  - 注：アナログ VHF は垂直偏波、UHF は水平偏波。KFB は denpa-data では局名「浪江」
- FM：NHK-FM 浪江・富岡 84.5MHz 空中線電力 10W（[ja.wikipedia「富岡中継局」](https://ja.wikipedia.org/wiki/%E5%AF%8C%E5%B2%A1%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 11.5W、垂直偏波
- 塔の写真・記述：なし（見つからなかった）

### いわき南（総務省の局名：いわき南（いわき））
- 場所：湯ノ岳（いわき市常磐藤原町）
- デジタル（6社同居、空中線電力 20W）：NHK総合 16ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 28ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2007年12月10日（6社）
  - デジタル ERP：NHK・FCT・KFB・FTV 230W、TUF 220W（ja.wikipedia「いわき中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 5ch（VHF）映像10W／音声2.5W、FTV 9ch（VHF）映像10W／音声2.5W、NHK教育 11ch（VHF）映像10W／音声2.5W、TUF 32ch（UHF）映像200W／音声50W、FCT 34ch（UHF）映像200W／音声50W、KFB 36ch（UHF）映像200W／音声50W
  - 場所の照合：デジタルはアナログ UHF と同じ湯ノ岳の山頂。木の点と山頂（GSI）は約0.02km
  - 注：**アナログ VHF（NHK 勿来・FTV いわき湯の岳）は湯の岳の南東側の中腹、約500m 離れた別の場所**（ja.wikipedia「いわき中継局」）
- FM：NHK-FM いわき勿来 83.6MHz 空中線電力 100W（[ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 110W。所在は「NHK勿来テレビ中継局（湯の岳）と同じ」＝アナログ VHF の中腹の側かもしれない（未確認）
- FM：SEA WAVE FMいわき（コミュニティFM） 76.2MHz 空中線電力 20W（[ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)）。「いわきアナログUHFテレビ中継局と同じ湯の岳山頂」
- 塔の写真・記述：なし（見つからなかった）

### 月舘（総務省の局名：月舘）
- 場所：屏風山（伊達市月舘町御代田）
- デジタル（6社同居、空中線電力 1W）：NHK総合 16ch、NHK教育 23ch、FTV 18ch、FCT 22ch、KFB 49ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年12月28日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 6ch（VHF）映像3W／音声750mW（比から見積もり）、NHK総合 4ch（VHF）映像3W／音声750mW（比から見積もり）、NHK教育 10ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 59ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 57ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 55ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「伊達月舘ＦＭ」（座標は未確認）
- FM：NHK-FM 伊達月舘 84.6MHz 空中線電力 3W（[ja.wikipedia「NHK福島放送局」FM放送の中継局の表](https://ja.wikipedia.org/wiki/NHK%E7%A6%8F%E5%B3%B6%E6%94%BE%E9%80%81%E5%B1%80)）。ERP 5W。denpa-data で同じ屏風山の「伊達月舘ＦＭ」
- 塔の写真・記述：なし（見つからなかった）

### 石川（総務省の局名：石川）
- 場所：愛宕山（石川郡石川町字関根）
- デジタル（6社同居、空中線電力 1W）：NHK総合 28ch、NHK教育 13ch、FTV 21ch、FCT 22ch、KFB 23ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年11月28日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 10ch（VHF）映像1W／音声250mW（比から見積もり）、NHK総合 3ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 12ch（VHF）映像1W／音声250mW（比から見積もり）、FCT 39ch（UHF）映像1W／音声250mW（比から見積もり）、KFB 43ch（UHF）映像1W／音声250mW（比から見積もり）、TUF 45ch（UHF）映像1W／音声250mW（比から見積もり）
  - 場所の照合：denpa-data の局名「石川」。木の点と愛宕山の山頂（GSI）は約1.1km 離れていて、同じ場所かは未確認
  - 注：『福島テレビ20年史』は FTV 石川を「石尊山」と書く（denpa-data は愛宕山）。食い違いは未解決
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：FTV 石川（昭和40年）から局舎が金属の箱になった（アナログ開局時）

### 磐梯熱海（総務省の局名：磐梯熱海）
- 場所：真弓山（郡山市熱海町安子島）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 28ch、NHK教育 13ch、FTV 49ch、FCT 40ch、KFB 38ch、TUF 51ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年11月28日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 19ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 17ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 21ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 23ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 55ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 53ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「郡山熱海」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 郡山田村（総務省の局名：郡山田村）
- 場所：宇津峰（郡山市田村町栃本）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 37ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年11月28日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 47ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 45ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 41ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 43ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 51ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 49ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「郡山田村」。木の点と宇津峰の点（GSI）は約0.26km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 田島（総務省の局名：田島）
- 場所：広平山（南会津郡下郷町）
- デジタル（6社同居、空中線電力 10W）：NHK総合 15ch、NHK教育 13ch、FTV 25ch、FCT 27ch、KFB 29ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年12月19日（6社）
  - デジタル ERP：NHK・TUF 66W、FCT・KFB・FTV 65W（ja.wikipedia「田島中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「田島中継局」](https://ja.wikipedia.org/wiki/%E7%94%B0%E5%B3%B6%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 5ch（VHF）映像30W／音声7.5W、NHK総合 9ch（VHF）映像30W／音声7.5W、FTV 11ch（VHF）映像30W／音声7.5W、FCT 33ch（UHF）映像100W／音声25W、KFB 35ch（UHF）映像100W／音声25W、TUF 39ch（UHF）映像100W／音声25W
  - 場所の照合：同じ記事に「広平山」（座標は未確認）
- FM：NHK-FM 南会津田島 85.0MHz 空中線電力 10W（[ja.wikipedia「田島中継局」](https://ja.wikipedia.org/wiki/%E7%94%B0%E5%B3%B6%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 22W
- 塔の写真・記述：なし（見つからなかった）

### 塙（総務省の局名：塙）
- 場所：米山（東白川郡塙町・棚倉町の境）
- デジタル（6社同居、空中線電力 3W）：NHK総合 30ch、NHK教育 13ch、FTV 18ch、FCT 17ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年12月19日（6社）
  - デジタル ERP：NHK総合 16.5W、NHK教育 17W、民放4社 14.5W（ja.wikipedia「米山 (福島県)」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「米山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%B1%B3%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)
  - TUF 28ch（UHF）映像30W／音声18W、KFB 42ch（UHF）映像30W／音声18W、NHK教育 48ch（UHF）映像30W／音声18W、FCT 50ch（UHF）映像30W／音声18W、NHK総合 52ch（UHF）映像30W／音声18W、FTV 54ch（UHF）映像30W／音声18W
  - 場所の照合：同じ記事に「塙中継局」。木の点と山頂（GSI）は約0.01km
  - 注：音声 18W は記事のまま（4：1 にならない。記事の誤りかもしれない、未確認）
- FM：NHK-FM 塙 83.8MHz 空中線電力 10W（[ja.wikipedia「米山 (福島県)」](https://ja.wikipedia.org/wiki/%E7%B1%B3%E5%B1%B1%20%28%E7%A6%8F%E5%B3%B6%E7%9C%8C%29)）。ERP 18.5W
- 塔：[写真](https://commons.wikimedia.org/wiki/File:Yoneyama_fukushima.jpg) キャプション「米山と塙中継局」（Commons。中身は未見）

### 柳津三島（総務省の局名：柳津三島）
- 場所：小野川山（河沼郡柳津町郷戸）
- デジタル（6社同居、空中線電力 3W）：NHK総合 15ch、NHK教育 13ch、FTV 25ch、FCT 27ch、KFB 29ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2008年12月19日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 8ch（VHF）映像10W／音声2.5W（比から見積もり）、NHK教育 2ch（VHF）映像10W／音声2.5W（比から見積もり）、FTV 54ch（UHF）映像30W／音声7.5W（比から見積もり）、FCT 56ch（UHF）映像30W／音声7.5W（比から見積もり）、KFB 58ch（UHF）映像30W／音声7.5W（比から見積もり）、TUF 60ch（UHF）映像30W／音声7.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「柳津・三島ＦＭ」（座標は未確認）
  - 注：denpa-data の FTV は 54ch（UHF）
- FM：NHK-FM 柳津・三島 84.9MHz 空中線電力 10W（[ja.wikipedia「NHK福島放送局」FM放送の中継局の表](https://ja.wikipedia.org/wiki/NHK%E7%A6%8F%E5%B3%B6%E6%94%BE%E9%80%81%E5%B1%80)）。ERP 11W
- 塔の写真・記述：なし（見つからなかった）

### 東只見（総務省の局名：東只見）
- 場所：俎倉山（南会津郡只見町亀岡）
- デジタル（6社同居、空中線電力 3W）：NHK総合 16ch、NHK教育 14ch、FTV 18ch、FCT 22ch、KFB 30ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年1月30日（6社）
  - デジタル ERP：6社とも 10.5W（ja.wikipedia「東只見中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「東只見中継局」](https://ja.wikipedia.org/wiki/%E6%9D%B1%E5%8F%AA%E8%A6%8B%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 2ch（VHF）映像10W／音声2.5W、NHK総合 4ch（VHF）映像10W／音声2.5W、FTV 10ch（VHF）映像10W／音声2.5W、FCT 57ch（UHF）映像30W／音声7.5W、TUF 59ch（UHF）映像30W／音声7.5W、KFB 61ch（UHF）映像30W／音声7.5W
  - 場所の照合：同じ記事に「俎倉山」（座標は未確認）
- FM：NHK-FM 只見明和 83.7MHz 空中線電力 10W（[ja.wikipedia「東只見中継局」](https://ja.wikipedia.org/wiki/%E6%9D%B1%E5%8F%AA%E8%A6%8B%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 16W
- 塔の写真・記述：なし（見つからなかった）

### 東金山（総務省の局名：東金山）
- 場所：惣山（大沼郡金山町大栗山）
- デジタル（6社同居、空中線電力 3W）：NHK総合 45ch、NHK教育 49ch、FTV 25ch、FCT 27ch、KFB 28ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年1月30日（6社）
  - デジタル ERP：記事では「不明」
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 5ch（VHF）映像3W／音声750mW（比から見積もり）、NHK総合 9ch（VHF）映像3W／音声750mW（比から見積もり）、NHK教育 12ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 33ch（UHF）映像30W／音声7.5W（比から見積もり）、KFB 43ch（UHF）映像30W／音声7.5W（比から見積もり）、TUF 39ch（UHF）映像30W／音声7.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「金山水沼ＦＭ」（山名は「忽山」、ja.wikipedia は「惣山」）。座標は未確認
  - 注：TUF のアナログ ch は TUF の一覧で 35、denpa-data で 39（未解決）
- FM：NHK-FM 金山 84.1MHz 空中線電力 10W（[ja.wikipedia「金山中継局」](https://ja.wikipedia.org/wiki/%E9%87%91%E5%B1%B1%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 16W。「NHK福島FMの金山中継局は惣山の東金山テレビ中継局に併設」（ja.wikipedia「金山中継局」）
- FM：rfc ラジオ福島 東金山FM補完中継局 77.8MHz 空中線電力 20W（[ja.wikipedia「東金山中継局」](https://ja.wikipedia.org/wiki/%E6%9D%B1%E9%87%91%E5%B1%B1%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 21W。所在は金山町大栗山字赤岩（惣山）
- 塔の写真・記述：なし（見つからなかった）

### いわき北（総務省の局名：いわき北（水石））
- 場所：水石山（いわき市三和町合戸）
- デジタル（6社同居、空中線電力 3W）：NHK総合 15ch、NHK教育 14ch、FTV 25ch、FCT 27ch、KFB 29ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年2月23日（6社）
  - デジタル ERP：6社とも 19.5W（ja.wikipedia「いわき中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 4ch（VHF）映像100W／音声25W、FTV 8ch（VHF）映像100W／音声25W、NHK教育 10ch（VHF）映像100W／音声25W、FCT 58ch（UHF）映像30W／音声7.5W、KFB 60ch（UHF）映像30W／音声7.5W、TUF 62ch（UHF）映像30W／音声7.5W
  - 場所の照合：同じ記事に「水石山」。木の点と山頂（GSI）は約0.17km
- FM：ふくしまFM いわき 78.6MHz 空中線電力 100W（[ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 155W。「NHK-FM・NHKテレビと送信柱共用」（ja.wikipedia「エフエム福島」）
- FM：NHK-FM いわき平 86.1MHz 空中線電力 100W（[ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 160W
- FM：rfc ラジオ福島 いわきFM補完中継局 90.2MHz 空中線電力 100W（[ja.wikipedia「いわき中継局」](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8F%E3%81%8D%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 175W。所在「NHKいわきテレビ中継局（水石山）と同じ」
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：FTV 平放送局（今のいわき平）は局舎の屋上に鉄塔、その上に格子の大きな面のアンテナが二つ（アナログ時代）

### 双葉川内（総務省の局名：双葉川内）
- 場所：弥宣の鉾（双葉郡川内村）
- デジタル（6社同居、空中線電力 1W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 17ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年10月26日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 1ch（VHF）映像3W／音声750mW（比から見積もり）、NHK総合 3ch（VHF）映像3W／音声750mW（比から見積もり）、NHK教育 6ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 62ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 56ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 54ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「川内」。木の点と山頂（GSI）は約0.05km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 荒海（総務省の局名：荒海）
- 場所：高倉山の中腹（南会津郡南会津町糸沢）
- デジタル（6社同居、空中線電力 1W）：NHK総合 28ch、NHK教育 24ch、FTV 21ch、FCT 17ch、KFB 19ch、TUF 23ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年12月10日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 10ch（VHF）映像3W／音声750mW（比から見積もり）、NHK総合 8ch（VHF）映像3W／音声750mW（比から見積もり）、NHK教育 2ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 56ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 60ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 62ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「南会津荒海」。木の点と高倉山の山頂（GSI）は約1km（送信所は中腹なので、ずれは山頂との差とみられる。未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 南郷（総務省の局名：南郷）
- 場所：北原山（南会津郡南会津町宮床）
- デジタル（6社同居、空中線電力 1W）：NHK総合 15ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 19ch、TUF 23ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年12月25日（6社）
  - デジタル ERP：6社とも 3.6W（ja.wikipedia「南郷中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「南郷中継局」](https://ja.wikipedia.org/wiki/%E5%8D%97%E9%83%B7%E4%B8%AD%E7%B6%99%E5%B1%80)
  - KFB 38ch（UHF）映像10W／音声2.5W、FCT 40ch（UHF）映像10W／音声2.5W、FTV 42ch（UHF）映像10W／音声2.5W、NHK総合 44ch（UHF）映像10W／音声2.5W、NHK教育 46ch（UHF）映像10W／音声2.5W、TUF 48ch（UHF）映像10W／音声2.5W
  - 場所の照合：同じ記事に「北原山」（座標は未確認）
  - 注：ERP：KFB・FCT・TUF 37W、FTV 36W、NHK 45W
- FM：NHK-FM 南会津南郷 84.5MHz 空中線電力 10W（[ja.wikipedia「NHK福島放送局」FM放送の中継局の表](https://ja.wikipedia.org/wiki/NHK%E7%A6%8F%E5%B3%B6%E6%94%BE%E9%80%81%E5%B1%80)）。ERP 32W。denpa-data の局名「南会津南郷ＦＭ」で同じ北原山
- 塔：docs/references/2026-10-06_tuf_analog_relays.md §5（『福島テレビ20年史』Gin の写真の要約） 『福島テレビ20年史』：南郷（昭和46年）は FTV が NHK と局舎・空中線・鉄柱を共同で建てた最初の局（塔を共用する形の手がかり）

### 昭和（総務省の局名：昭和）
- 場所：俎倉山（大沼郡昭和村野尻）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 31ch、NHK教育 32ch、FTV 25ch、FCT 27ch、KFB 28ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年12月25日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 42ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 40ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 38ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 36ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 44ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 46ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「昭和」。木の点と俎倉山の山頂（GSI）は約0.19km
- FM：ふくしまFM・rfc ラジオ福島 の昭和村の公設 SFM（0.1W、9か所） ふくしまFM 82.8MHz／rfc 90.8MHz 空中線電力 0.1W（[ja.wikipedia「エフエム福島」中継局の表](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%95%E3%82%A8%E3%83%A0%E7%A6%8F%E5%B3%B6)）。**不明**：昭和村親局 SFM・野尻ラジオ SFM などの場所が資料に書かれておらず、この塔に同居するかは分からない
- 塔の写真・記述：なし（見つからなかった）

### 蓬田（総務省の局名：蓬田）
- 場所：蓬田岳（石川郡平田村）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年12月25日（6社）
  - デジタル ERP：6社とも 1.1W（ja.wikipedia「蓬田テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「蓬田テレビ中継局」](https://ja.wikipedia.org/wiki/%E8%93%AC%E7%94%B0%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 24ch（UHF）映像3W／音声750mW、NHK教育 28ch（UHF）映像3W／音声750mW、NHK総合 30ch（UHF）映像3W／音声750mW、FCT 32ch（UHF）映像3W／音声750mW、FTV 34ch（UHF）映像3W／音声750mW、KFB 36ch（UHF）映像3W／音声750mW
  - 場所の照合：同じ記事に「蓬田岳」。木の点と山頂（GSI）は約0.14km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 東裏磐梯（総務省の局名：東裏磐梯）
- 場所：（記事）猪苗代町若宮字大島原／（denpa-data）若宮字吾妻山甲・金堀観音山
- デジタル（6社同居、空中線電力 0.1W）：NHK総合 34ch、NHK教育 43ch、FTV 39ch、FCT 32ch、KFB 28ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2009年12月25日（6社）
  - デジタル ERP：6社とも 850mW（ja.wikipedia「東裏磐梯中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「東裏磐梯中継局」](https://ja.wikipedia.org/wiki/%E6%9D%B1%E8%A3%8F%E7%A3%90%E6%A2%AF%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 52ch（UHF）映像1W／音声250mW、NHK総合 54ch（UHF）映像1W／音声250mW、FTV 56ch（UHF）映像1W／音声250mW、FCT 58ch（UHF）映像1W／音声250mW、KFB 60ch（UHF）映像1W／音声250mW、TUF 62ch（UHF）映像1W／音声250mW
  - 場所の照合：同じ記事だが、記事の所在地（若宮字大島原）と denpa-data のアナログの所在地（若宮字吾妻山甲）が違う。同じ場所かは未確認
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 只見（総務省の局名：只見）
- 場所：要害山（南会津郡只見町只見）
- デジタル（6社同居、空中線電力 2W）：NHK総合 34ch、NHK教育 50ch、FTV 31ch、FCT 32ch、KFB 36ch、TUF 47ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
  - デジタル ERP：記事では「-」（不明）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「只見中継局」](https://ja.wikipedia.org/wiki/%E5%8F%AA%E8%A6%8B%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 1ch（VHF）映像1W／音声250mW、FTV 3ch（VHF）映像1W／音声250mW、NHK教育 9ch（VHF）映像1W／音声250mW、TUF 38ch（UHF）映像10W／音声2.5W、FCT 40ch（UHF）映像10W／音声2.5W、KFB 42ch（UHF）映像10W／音声2.5W
  - 場所の照合：同じ記事に「要害山」。木の点と山頂（GSI）は約0.05km
  - 注：水平偏波
- FM：NHK-FM 只見 84.8MHz 空中線電力 1W（[ja.wikipedia「只見中継局」](https://ja.wikipedia.org/wiki/%E5%8F%AA%E8%A6%8B%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 810mW
- 塔の写真・記述：なし（見つからなかった）

### 三春（総務省の局名：三春）
- 場所：御城山（田村郡三春町）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 44ch、NHK教育 13ch、FTV 42ch、FCT 40ch、KFB 38ch、TUF 46ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 56ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 58ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 50ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 48ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 54ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 52ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「三春」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 天栄（総務省の局名：天栄）
- 場所：明神山（岩瀬郡天栄村牧之内）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 55ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 57ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 59ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 61ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 53ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 51ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「天栄」。木の点と山頂（GSI）は約0.05km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 東塙（総務省の局名：東塙）
- 場所：九ツ山（東白川郡塙町板庭）
- デジタル（6社同居、空中線電力 1W）：NHK総合 30ch、NHK教育 13ch、FTV 21ch、FCT 32ch、KFB 23ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
  - デジタル ERP：6社とも 2.4W（ja.wikipedia「九ツ山」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [ja.wikipedia「九ツ山」](https://ja.wikipedia.org/wiki/%E4%B9%9D%E3%83%84%E5%B1%B1)
  - FCT 34ch（UHF）映像10W／音声6W、NHK教育 36ch（UHF）映像10W／音声6W、FTV 38ch（UHF）映像10W／音声6W、NHK総合 40ch（UHF）映像10W／音声6W
  - 場所の照合：同じ記事。木の点と記事の座標は約0.05km
  - 注：KFB・TUF はアナログでは ch の割り当てなし。音声 6W は記事のまま（4：1 にならない）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔：[写真](https://commons.wikimedia.org/wiki/File:Akadate.jpg) 九ツ山の記事の写真（赤館公園より）。塔が写っているかは未見

### 表郷（総務省の局名：表郷）
- 場所：武鉾山の中腹（白河市表郷）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 21ch、FCT 22ch、KFB 23ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
  - デジタル ERP：6社とも 3.1W（ja.wikipedia「武鉾山」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [ja.wikipedia「武鉾山」](https://ja.wikipedia.org/wiki/%E6%AD%A6%E9%89%BE%E5%B1%B1)
  - NHK教育 49ch（UHF）映像3W／音声750mW、NHK総合 51ch（UHF）映像3W／音声750mW、FTV 53ch（UHF）映像3W／音声750mW
  - 場所の照合：同じ記事（表郷中継局概要）。木の点と記事の座標は約0.02km
  - 注：FCT・KFB・TUF はアナログなし（デジタル新局）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔：[写真](https://commons.wikimedia.org/wiki/File:Takehokoyama.jpg) 武鉾山の全景。「山の中腹にテレビ中継局」とあるが、塔が写るかは未見

### 川俣（総務省の局名：川俣）
- 場所：布引山の中腹（伊達郡川俣町鶴沢）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 37ch、FTV 18ch、FCT 22ch、KFB 47ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 7ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 5ch（VHF）映像1W／音声250mW（比から見積もり）、FTV 41ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 39ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 43ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 45ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「川俣」。木の点と布引山の山頂（GSI）は約0.6km（送信所は中腹）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 長沼（総務省の局名：長沼）
- 場所：弁財天山（須賀川市江花）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 62ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 56ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 54ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 52ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 60ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 58ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「須賀川長沼」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 船引（総務省の局名：船引）
- 場所：片曽根山（田村市船引町）
- デジタル（6社同居、空中線電力 1W）：NHK総合 21ch、NHK教育 17ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 10ch（VHF）映像1W／音声250mW（比から見積もり）、NHK総合 4ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 8ch（VHF）映像1W／音声250mW（比から見積もり）、FCT 39ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 43ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 45ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「田村船引」。木の点と山頂（GSI）は約0.01km
  - 注：denpa-data では UHF は垂直偏波
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西古殿（総務省の局名：西古殿）
- 場所：市房内山（石川郡古殿町鎌田）
- デジタル（6社同居、空中線電力 1W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 4ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 59ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 57ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 61ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK総合 51ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK教育 49ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「古殿鎌田」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 棚倉富岡（総務省の局名：棚倉富岡）
- 場所：法度山（東白川郡棚倉町）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 30ch、NHK教育 13ch、FTV 18ch、FCT 17ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年1月15日（6社）
  - デジタル ERP：NHK 1.1W、民放4社 1.3W（ja.wikipedia「棚倉富岡中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「棚倉富岡中継局」](https://ja.wikipedia.org/wiki/%E6%A3%9A%E5%80%89%E5%AF%8C%E5%B2%A1%E4%B8%AD%E7%B6%99%E5%B1%80)
  - FCT 37ch（UHF）映像3W／音声1.8W、NHK教育 39ch（UHF）映像3W／音声1.8W、KFB 41ch（UHF）映像3W／音声1.8W、NHK総合 43ch（UHF）映像3W／音声1.8W、FTV 45ch（UHF）映像3W／音声1.8W、TUF 47ch（UHF）映像3W／音声1.8W
  - 場所の照合：同じ記事。木の点と記事の座標は約0.04km
  - 注：音声 1.8W は記事のまま（4：1 にならない）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔：[写真](https://commons.wikimedia.org/wiki/File:Tomioka_TV.jpg) キャプション「棚倉富岡中継局（赤館公園より）」（Commons。中身は未見）

### いわき遠野（総務省の局名：いわき遠野）
- 場所：弁天山（いわき市遠野町）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 15ch、NHK教育 14ch、FTV 29ch、FCT 43ch、KFB 19ch、TUF 45ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年8月14日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 1ch（VHF）映像1W／音声250mW（比から見積もり）、NHK総合 3ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 12ch（VHF）映像1W／音声250mW（比から見積もり）、FCT 50ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 52ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「いわき遠野」（座標は未確認）
  - 注：TUF はアナログなし（デジタル新局）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 磐城西郷（総務省の局名：磐城西郷）
- 場所：川谷の南西の高地（西白河郡西郷村真船）
- デジタル（6社同居、空中線電力 1W）：NHK総合 28ch、NHK教育 37ch、FTV 40ch、FCT 33ch、KFB 36ch、TUF 31ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：NHK総合 2010年9月29日、NHK教育 2010年9月29日、FTV 2012年5月28日、FCT 2012年5月28日、KFB 2012年5月28日、TUF 2012年5月28日
  - デジタル ERP：NHK 18W、民放4社 17W（ja.wikipedia「磐城西郷テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [ja.wikipedia「磐城西郷テレビ中継局」](https://ja.wikipedia.org/wiki/%E7%A3%90%E5%9F%8E%E8%A5%BF%E9%83%B7%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 40ch（UHF）映像3W／音声750mW、NHK教育 42ch（UHF）映像3W／音声750mW
  - 場所の照合：同じ記事（座標は未確認）
  - 注：アナログは NHK だけ
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）
- 注：民放4社のデジタルは 2012年5月（総務省の表 2012-05-28、記事は 5月17日）。NHK は 2010-09-29

### 東常葉（総務省の局名：東常葉）
- 場所：鳴子山？（田村市都路町岩井沢）
- デジタル（6社同居、空中線電力 1W）：NHK総合 40ch、NHK教育 38ch、FTV 48ch、FCT 50ch、KFB 43ch、TUF 45ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：NHK総合 2010年9月29日、NHK教育 2010年9月29日、FTV 2012年12月19日、FCT 2012年12月19日、KFB 2012年12月19日、TUF 2012年12月19日
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 55ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 53ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の読み替え表で「田村堀田→東常葉」。**デジタルの東常葉が同じ鳴子山かは未確認**（2026-10-08 の木の注は送信所を「牧山」と書く）
  - 注：アナログは NHK だけ
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 福島信夫（総務省の局名：福島信夫）
- 場所：信夫山（福島市）
- デジタル（6社同居、空中線電力 1W）：NHK総合 16ch、NHK教育 23ch、FTV 18ch、FCT 22ch、KFB 49ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年9月29日（6社）
  - デジタル ERP：NHK・FCT・TUF・FTV 2.5W、KFB 2.9W（ja.wikipedia「福島市内テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「福島市内テレビ中継局」](https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E5%B8%82%E5%86%85%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 37ch（UHF）映像3W／音声750mW、FCT 39ch（UHF）映像3W／音声750mW、FTV 41ch（UHF）映像3W／音声750mW、NHK総合 43ch（UHF）映像3W／音声750mW、NHK教育 45ch（UHF）映像3W／音声750mW、KFB 47ch（UHF）映像3W／音声750mW
  - 場所の照合：同じ記事に「信夫山」。木の点と山頂（GSI）は約0.9km（山頂の点と局の点の違いの範囲かは未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 小野（総務省の局名：小野）
- 場所：愛宕山（田村郡小野町小野新町）
- デジタル（6社同居、空中線電力 1W）：NHK総合 40ch、NHK教育 38ch、FTV 48ch、FCT 50ch、KFB 17ch、TUF 52ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年9月29日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 3ch（VHF）映像1W／音声250mW（比から見積もり）、NHK総合 1ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 5ch（VHF）映像1W／音声250mW（比から見積もり）、FCT 21ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 53ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 55ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「小野ＦＭ」。**デジタルの小野がアナログと同じ愛宕山かは未確認**（座標なし）
- FM：NHK-FM 小野 84.0MHz 空中線電力 3W（[ja.wikipedia「NHK福島放送局」FM放送の中継局の表](https://ja.wikipedia.org/wiki/NHK%E7%A6%8F%E5%B3%B6%E6%94%BE%E9%80%81%E5%B1%80)）。ERP 2.5W。アナログの愛宕山にあった FM（denpa-data「小野ＦＭ」）。デジタルの局と同じ場所かは未確認
- 塔の写真・記述：なし（見つからなかった）

### 浪江津島（総務省の局名：浪江津島）
- 場所：松森山（双葉郡浪江町南津島）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 37ch、FTV 18ch、FCT 22ch、KFB 23ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年9月29日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 57ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 59ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 55ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 53ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「浪江津島」（座標は未確認）
  - 注：ja.wikipedia「浪江津島中継局」は「出力 3W」とだけ書く（映像・音声の別なし）。KFB・TUF はアナログなし
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 岩代（総務省の局名：岩代）
- 場所：鳥上山（二本松市百目木）
- デジタル（6社同居、空中線電力 1W）：NHK総合 40ch、NHK教育 38ch、FTV 42ch、FCT 34ch、KFB 36ch、TUF 32ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：NHK総合 2010年10月13日、NHK教育 2010年10月13日、FTV 2013年1月29日、FCT 2013年1月29日、KFB 2013年1月29日、TUF 2013年1月29日
  - デジタル ERP：NHK 4.3W、民放4社 3.1W（ja.wikipedia「岩代テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [ja.wikipedia「岩代テレビ中継局」](https://ja.wikipedia.org/wiki/%E5%B2%A9%E4%BB%A3%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK教育 5ch（VHF）映像1W／音声250mW、NHK総合 7ch（VHF）映像1W／音声250mW、FTV 12ch（VHF）映像1W／音声250mW
  - 場所の照合：同じ記事に「鳥上山」（座標は未確認）
  - 注：アナログは NHK と FTV の VHF だけ。FCT・KFB・TUF はデジタル新局（2013-01）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）
- 注：民放4社のデジタルは NHK より遅く 2013年1月の開局（総務省の表 2013-01-29、記事は 1月27日）

### いわき湯本（総務省の局名：いわき湯本）
- 場所：いわき湯本病院の北（いわき市常磐湯本町）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 15ch、NHK教育 23ch、FTV 18ch、FCT 22ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年10月13日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 38ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 48ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 50ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 52ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 40ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 42ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「いわき湯本」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 古殿（総務省の局名：古殿）
- 場所：館山（石川郡古殿町松川）
- デジタル（6社同居、空中線電力 1W）：NHK総合 41ch、NHK教育 43ch、FTV 42ch、FCT 46ch、KFB 45ch、TUF 44ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年11月1日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 10ch（VHF）映像3W／音声750mW（比から見積もり）、NHK総合 3ch（VHF）映像3W／音声750mW（比から見積もり）、NHK教育 12ch（VHF）映像3W／音声750mW（比から見積もり）、FCT 39ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 25ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 27ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「古殿」。木の点と館山の山頂（GSI）は約0.16km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 大久（総務省の局名：大久）
- 場所：大場山（いわき市大久町）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 45ch、NHK教育 43ch、FTV 34ch、FCT 40ch、KFB 36ch、TUF 37ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：NHK総合 2010年11月1日、NHK教育 2010年11月1日、FTV 2013年3月27日、FCT 2013年3月27日、KFB 2013年3月27日、TUF 2013年3月27日
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 55ch（UHF）映像1W／音声250mW（比から見積もり）、NHK教育 53ch（UHF）映像1W／音声250mW（比から見積もり）
  - 場所の照合：denpa-data の局名「いわき大久」（座標は未確認）
  - 注：アナログは NHK だけ。民放4社のデジタルは 2013-03-27（NHK は 2010-11-01）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 福島大波（総務省の局名：福島大波）
- 場所：黒志田山（福島市大波）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 30ch、NHK教育 32ch、FTV 34ch、FCT 40ch、KFB 38ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年11月1日（6社）
  - デジタル ERP：NHK・FCT・KFB・FTV 55mW、TUF 56mW（ja.wikipedia「福島市内テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「福島市内テレビ中継局」](https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E5%B8%82%E5%86%85%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 52ch（UHF）映像100mW／音声25mW、KFB 54ch（UHF）映像100mW／音声25mW、FCT 56ch（UHF）映像100mW／音声25mW、FTV 58ch（UHF）映像100mW／音声25mW、NHK総合 60ch（UHF）映像100mW／音声25mW、NHK教育 62ch（UHF）映像100mW／音声25mW
  - 場所の照合：同じ記事に「黒志田山」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 犬神（総務省の局名：犬神）
- 場所：犬神ダムの西の山（白河市表郷金山）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 21ch、NHK教育 23ch、FTV 18ch、FCT 17ch、KFB 19ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年11月1日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 43ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 41ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 39ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 37ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 45ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 47ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「白河犬神」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 郡山河内（総務省の局名：郡山河内（V））
- 場所：河内小学校の北の高地（郡山市逢瀬町河内）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 40ch、NHK教育 38ch、FTV 45ch、FCT 43ch、KFB 47ch、TUF 49ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年11月1日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 58ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 56ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 54ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 52ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 60ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 62ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「郡山河内」（座標は未確認）
  - 注：denpa-data では垂直偏波
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 保原富沢（総務省の局名：保原富沢）
- 場所：台山（伊達市保原町富沢）
- デジタル（6社同居、空中線電力 0.1W）：NHK総合 16ch、NHK教育 23ch、FTV 18ch、FCT 22ch、KFB 48ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月6日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 58ch（UHF）映像1W／音声250mW（比から見積もり）、FCT 60ch（UHF）映像1W／音声250mW（比から見積もり）、KFB 52ch（UHF）映像1W／音声250mW（比から見積もり）、TUF 50ch（UHF）映像1W／音声250mW（比から見積もり）、NHK総合 56ch（UHF）映像1W／音声250mW（比から見積もり）、NHK教育 54ch（UHF）映像1W／音声250mW（比から見積もり）
  - 場所の照合：denpa-data の局名「伊達富沢」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西金山（総務省の局名：西金山）
- 場所：田沢山（大沼郡金山町田沢）
- デジタル（6社同居、空中線電力 1W）：NHK総合 15ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 23ch、TUF 19ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月6日（6社）
  - デジタル ERP：記事では「不明」
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 4ch（VHF）映像1W／音声250mW（比から見積もり）、NHK総合 2ch（VHF）映像1W／音声250mW（比から見積もり）、NHK教育 11ch（VHF）映像1W／音声250mW（比から見積もり）、FCT 57ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 59ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 61ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「金山大塩ＦＭ」。木の点と山頂（GSI）は約0.18km
- FM：NHK-FM 金山大塩 83.3MHz 空中線電力 1W（[ja.wikipedia「西金山中継局」](https://ja.wikipedia.org/wiki/%E8%A5%BF%E9%87%91%E5%B1%B1%E4%B8%AD%E7%B6%99%E5%B1%80)）。ERP 2.3W
- FM：rfc ラジオ福島 西金山FM補完中継局 79.3MHz 空中線電力 20W（[ja.wikipedia「ラジオ福島」FM補完中継局の表](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%B8%E3%82%AA%E7%A6%8F%E5%B3%B6)）。ERP 28.8W。所在は金山町田沢（田沢山）
- 塔の写真・記述：なし（見つからなかった）
- 注：ja.wikipedia「西金山中継局」のデジタルの ch は総務省の表と合わない。ch は総務省の表に従った

### 高玉（総務省の局名：高玉）
- 場所：高玉金山（郡山市熱海町高玉）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 37ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月6日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 44ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 42ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 50ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 46ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 48ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「郡山高玉」（座標は未確認）
  - 注：TUF はアナログなし（デジタル新局）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 伊南（総務省の局名：伊南）
- 場所：円角山（南会津郡南会津町小塩）
- デジタル（6社同居、空中線電力 1W）：NHK総合 34ch、NHK教育 24ch、FTV 28ch、FCT 32ch、KFB 30ch、TUF 26ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月6日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 54ch（UHF）映像10W／音声2.5W（比から見積もり）、FCT 56ch（UHF）映像10W／音声2.5W（比から見積もり）、KFB 58ch（UHF）映像10W／音声2.5W（比から見積もり）、TUF 60ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK総合 52ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK教育 50ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「南会津伊南」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 東昭和（総務省の局名：東昭和）
- 場所：赤坂山（大沼郡昭和村大芦）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 14ch、FTV 18ch、FCT 22ch、KFB 30ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月6日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 54ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 56ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 58ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 60ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 52ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 50ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「昭和大芦」。木の点と山頂（GSI）は約0.04km
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 土湯（総務省の局名：土湯）
- 場所：福島市土湯温泉町見附
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 28ch、NHK教育 37ch、FTV 39ch、FCT 40ch、KFB 38ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
  - デジタル ERP：6社とも 100mW（ja.wikipedia「福島市内テレビ中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「福島市内テレビ中継局」](https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E5%B8%82%E5%86%85%E3%83%86%E3%83%AC%E3%83%93%E4%B8%AD%E7%B6%99%E5%B1%80)
  - TUF 51ch（UHF）映像100mW／音声25mW、KFB 53ch（UHF）映像100mW／音声25mW、FCT 55ch（UHF）映像100mW／音声25mW、FTV 57ch（UHF）映像100mW／音声25mW、NHK総合 59ch（UHF）映像100mW／音声25mW、NHK教育 61ch（UHF）映像100mW／音声25mW
  - 場所の照合：記事のデジタルの住所は「見附60番地」、denpa-data のアナログは「字見附34」。同じ場所かは未確認
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 金山（総務省の局名：金山）
- 場所：雀巣山（大沼郡金山町西谷）
- デジタル（6社同居、空中線電力 1W）：NHK総合 15ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 23ch、TUF 19ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
  - デジタル ERP：記事では「-W」（不明）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「金山中継局」](https://ja.wikipedia.org/wiki/%E9%87%91%E5%B1%B1%E4%B8%AD%E7%B6%99%E5%B1%80)
  - NHK総合 2ch（VHF）映像1W／音声250mW、FTV 4ch（VHF）映像1W／音声250mW、NHK教育 11ch（VHF）映像1W／音声250mW、FCT 57ch（UHF）映像10W／音声2.5W、KFB 59ch（UHF）映像10W／音声2.5W、TUF 61ch（UHF）映像10W／音声2.5W
  - 場所の照合：同じ記事。木の点と記事の座標は約0.03km
- FM：rfc ラジオ福島 金山FM補完中継局 79.3MHz 空中線電力 5W（[ja.wikipedia「金山中継局」](https://ja.wikipedia.org/wiki/%E9%87%91%E5%B1%B1%E4%B8%AD%E7%B6%99%E5%B1%80)）。**同居しない**：rfc は金山町八町（テレビは西谷の雀巣山）。NHK-FM「金山」も惣山の東金山に併設で、ここにはない
- 塔の写真・記述：なし（見つからなかった）
- 注：ja.wikipedia「金山中継局」のデジタルの ch（TUF 17 など）は総務省の表（TUF 19）と合わない。ch は総務省の表に従った

### 裏磐梯（総務省の局名：裏磐梯）
- 場所：寺沢山（耶麻郡北塩原村桧原）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 16ch、NHK教育 13ch、FTV 18ch、FCT 22ch、KFB 23ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
  - デジタル ERP：6社とも 3.1W（ja.wikipedia「裏磐梯中継局」）
- アナログ（調べて分かった（映像・音声とも資料）、TUF のアナログ：あり）：出どころ [ja.wikipedia「裏磐梯中継局」](https://ja.wikipedia.org/wiki/%E8%A3%8F%E7%A3%90%E6%A2%AF%E4%B8%AD%E7%B6%99%E5%B1%80)
  - FCT 40ch（UHF）映像3W／音声750mW、FTV 42ch（UHF）映像3W／音声750mW、NHK総合 44ch（UHF）映像3W／音声750mW、NHK教育 46ch（UHF）映像3W／音声750mW、KFB 48ch（UHF）映像3W／音声750mW、TUF 50ch（UHF）映像3W／音声750mW
  - 場所の照合：同じ記事に「寺沢山」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 南川俣（総務省の局名：南川俣）
- 場所：小松倉山（伊達郡川俣町大綱木）
- デジタル（6社同居、空中線電力 0.1W）：NHK総合 28ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 19ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 60ch（UHF）映像1W／音声250mW（比から見積もり）、FCT 58ch（UHF）映像1W／音声250mW（比から見積もり）、KFB 52ch（UHF）映像1W／音声250mW（比から見積もり）、TUF 50ch（UHF）映像1W／音声250mW（比から見積もり）、NHK総合 56ch（UHF）映像1W／音声250mW（比から見積もり）、NHK教育 54ch（UHF）映像1W／音声250mW（比から見積もり）
  - 場所の照合：denpa-data の局名「川俣大綱木」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 南伊南（総務省の局名：南伊南）
- 場所：見受山・鬼丸山の中腹（南会津郡南会津町耻風）
- デジタル（6社同居、空中線電力 0.05W）：NHK総合 16ch、NHK教育 14ch、FTV 18ch、FCT 22ch、KFB 25ch、TUF 20ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 41ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 39ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 47ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 43ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 45ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「南会津大川」。木の点と鬼丸山の山頂（GSI）は約2.1km（送信所は中腹。同じ場所かは未確認）
  - 注：KFB はアナログなし
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 南伊南耻風（総務省の局名：南伊南耻風）
- 場所：南会津町耻風（場所の名は未確認）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 15ch、NHK教育 13ch、FTV 21ch、FCT 17ch、KFB 19ch、TUF 23ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ：アナログ局は見つからない（denpa-data の表にも ja.wikipedia にもない）。不明
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西郷長坂（総務省の局名：西郷長坂）
- 場所：永倉神社の入口（西白河郡西郷村長坂）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 30ch、NHK教育 32ch、FTV 39ch、FCT 34ch、KFB 23ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 54ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 48ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 38ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 36ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 52ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 50ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「西郷長坂」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西郷虫笠（総務省の局名：西郷虫笠）
- 場所：虫笠の集落センターの南西の高地（西郷村羽太）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 30ch、NHK教育 32ch、FTV 28ch、FCT 34ch、KFB 23ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 47ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 41ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 39ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 37ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 45ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 43ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「西郷虫笠」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西郷谷地中（総務省の局名：西郷谷地中（V））
- 場所：みずほ保育園（西郷村米）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 30ch、NHK教育 32ch、FTV 39ch、FCT 28ch、KFB 23ch、TUF 24ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 61ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 55ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 53ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 51ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 59ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 57ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「西郷谷地中」（座標は未確認）
  - 注：denpa-data では垂直偏波
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 矢祭（総務省の局名：矢祭）
- 場所：物見山（東白川郡矢祭町）
- デジタル（6社同居、空中線電力 0.3W）：NHK総合 41ch、NHK教育 37ch、FTV 39ch、FCT 43ch、KFB 45ch、TUF 44ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 53ch（UHF）映像3W／音声750mW（比から見積もり）、FCT 55ch（UHF）映像3W／音声750mW（比から見積もり）、KFB 57ch（UHF）映像3W／音声750mW（比から見積もり）、TUF 59ch（UHF）映像3W／音声750mW（比から見積もり）、NHK総合 51ch（UHF）映像3W／音声750mW（比から見積もり）、NHK教育 49ch（UHF）映像3W／音声750mW（比から見積もり）
  - 場所の照合：denpa-data の局名「矢祭」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 大里（総務省の局名：大里）
- 場所：山崎城址の小山（岩瀬郡天栄村大里）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 42ch、NHK教育 37ch、FTV 44ch、FCT 40ch、KFB 46ch、TUF 48ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2010年12月24日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 45ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 43ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 41ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 39ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 47ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 49ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「天栄大里」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 古殿松川（総務省の局名：古殿松川）
- 場所：やぶさめアリーナの南の崖（石川郡古殿町松川）
- デジタル（6社同居、空中線電力 0.019W）：NHK総合 30ch、NHK教育 32ch、FTV 34ch、FCT 35ch、KFB 36ch、TUF 37ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2011年4月20日（6社）
  - デジタル ERP：6社とも 100mW（ja.wikipedia「古殿松川テレビ中継局」）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：あり）：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 54ch（UHF）映像100mW／音声25mW（比から見積もり）、FCT 56ch（UHF）映像100mW／音声25mW（比から見積もり）、KFB 60ch（UHF）映像100mW／音声25mW（比から見積もり）、TUF 62ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK総合 52ch（UHF）映像100mW／音声25mW（比から見積もり）、NHK教育 50ch（UHF）映像100mW／音声25mW（比から見積もり）
  - 場所の照合：denpa-data の局名「古殿松川」（座標は未確認）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 白河南（総務省の局名：白河南）
- 場所：白河市（場所の名は未確認）
- デジタル（6社同居、空中線電力 1W）：NHK総合 30ch、NHK教育 32ch、FTV 42ch、FCT 43ch、KFB 45ch、TUF 46ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2012年5月17日（6社）
  - デジタル ERP：6社とも 8.7W（ja.wikipedia「白河南テレビ中継局」）
- アナログ：アナログ局なし（2012年5月開局のデジタルだけの局。ja.wikipedia「白河南テレビ中継局」）
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 小野浮金（総務省の局名：小野浮金）
- 場所：浮金中学校跡の東の丘（田村郡小野町浮金）
- デジタル（6社同居、空中線電力 1W）：NHK総合 43ch、NHK教育 45ch、FTV 32ch、FCT 34ch、KFB 36ch、TUF 31ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2012年12月25日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 45ch（UHF）映像1W／音声250mW（比から見積もり）、NHK教育 47ch（UHF）映像1W／音声250mW（比から見積もり）
  - 場所の照合：denpa-data の局名「小野浮金」。デジタルと同じ場所かは未確認
  - 注：アナログは NHK だけ
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 鹿島栃窪（総務省の局名：鹿島栃窪）
- 場所：大森山（南相馬市鹿島区栃窪）
- デジタル（6社同居、空中線電力 0.05W）：NHK総合 40ch、NHK教育 38ch、FTV 42ch、FCT 46ch、KFB 48ch、TUF 44ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2013年1月29日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - NHK総合 44ch（UHF）映像500mW／音声125mW（比から見積もり）、NHK教育 46ch（UHF）映像500mW／音声125mW（比から見積もり）
  - 場所の照合：denpa-data の局名「南相馬栃窪」。デジタルと同じ場所かは未確認
  - 注：アナログは NHK だけ
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### 西郷羽太（総務省の局名：西郷羽太）
- 場所：動石神社の上（西白河郡西郷村羽太）
- デジタル（6社同居、空中線電力 0.01W）：NHK総合 37ch、NHK教育 38ch、FTV 39ch、FCT 35ch、KFB 36ch、TUF 40ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2013年3月6日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 48ch（UHF）映像500mW／音声125mW（比から見積もり）、FCT 50ch（UHF）映像500mW／音声125mW（比から見積もり）、NHK総合 40ch（UHF）映像500mW／音声125mW（比から見積もり）、NHK教育 42ch（UHF）映像500mW／音声125mW（比から見積もり）
  - 場所の照合：denpa-data の局名「西郷羽太」。デジタルと同じ場所かは未確認
  - 注：KFB・TUF はアナログなし
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）

### いわき窪田（総務省の局名：いわき窪田）
- 場所：犬飼山（いわき市勿来町酒井）
- デジタル（6社同居、空中線電力 3W）：NHK総合 49ch、NHK教育 50ch、FTV 34ch、FCT 48ch、KFB 31ch、TUF 32ch。出どころ：[総務省 東北総合通信局「福島県（2013年12月19日現在）」免許情報の表](https://www.soumu.go.jp/soutsu/tohoku/digital/fukushimalicense.html)
  - 運用開始：2013年12月27日（6社）
- アナログ（映像は資料、音声は比から見積もり（映像：音声＝4：1）、TUF のアナログ：なし（TUF はデジタルで新しく置いた））：出どころ [denpa-data「福島県アナログテレビチャンネル周波数ガイド」（個人サイト）](http://www.denpa-data.com/denpadata/tohoku_tv/fukushima_analog.htm)
  - FTV 22ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK総合 20ch（UHF）映像10W／音声2.5W（比から見積もり）、NHK教育 18ch（UHF）映像10W／音声2.5W（比から見積もり）
  - 場所の照合：denpa-data の局名「いわき窪田」。デジタルと同じ場所かは未確認
  - 注：FCT・KFB・TUF はアナログなし
- FM：一覧（NHK-FM・ふくしまFM・rfc FM補完の中継局の表）に、この場所の FM 局は見当たらない
- 塔の写真・記述：なし（見つからなかった）
