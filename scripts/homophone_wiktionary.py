"""同じ音の言葉を ja.wiktionary の API で引く（weblio の homo.py の替わり）。

使い方: python -I scripts/homophone_wiktionary.py <読み> [<読み> ...]
- 名乗り（User-Agent）は Gin の決め（2026-10-27）。汎用の名やブラウザの名乗りは使わない。
- 一つずつ直列で、間を 5 秒あける。429 が来たら Retry-After（60 秒以上）待って一度だけやり直し、二度目は止める。maxlag=5。結果はキャッシュし、同じ読みは二度引かない。
- 出すのは見出し語と URL だけ。説明の文は取り込まない（コトバンク・weblio と同じ決め）。
- 規約: docs/proposals/2026-10-27_homophone_tool_wiktionary.md
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://ja.wiktionary.org/w/api.php"
UA = "HNS-lookup/0.1 (ja.wiktionary; User:Dcmick)"
WAIT = 5
CACHE = os.environ.get("HNS_WIKT_CACHE", os.path.join(os.path.dirname(__file__), "..", ".cache", "wiktionary.json"))

_last = 0.0


def _get(params):
    global _last
    params = dict(params, format="json", formatversion="2", maxlag="5")
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(4):
        gap = time.monotonic() - _last
        if gap < WAIT:
            time.sleep(WAIT - gap)
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "identity"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                _last = time.monotonic()
                data = json.load(r)
        except urllib.error.HTTPError as e:
            _last = time.monotonic()
            if e.code != 429 or attempt >= 1:
                raise
            # 429（多すぎる）：Retry-After だけ待って一度だけやり直す。二度目は止める
            time.sleep(max(int(e.headers.get("Retry-After") or 0), 60))
            continue
        err = data.get("error", {}).get("code")
        if err in ("maxlag", "ratelimited"):
            time.sleep(WAIT * (2 ** (attempt + 2)))
            continue
        return data
    raise RuntimeError("API が混んでいるため止めた: " + url)


def _kana_page(yomi):
    """かなの見出しのページから、日本語の節の「# [[語]]」の語だけを取る。"""
    d = _get({"action": "query", "titles": yomi, "prop": "revisions", "rvprop": "content", "rvslots": "main"})
    page = d["query"]["pages"][0]
    if page.get("missing"):
        return []
    text = page["revisions"][0]["slots"]["main"]["content"]
    m = re.search(r"==\s*(?:日本語|\{\{(?:L\|)?ja\}\}|\{\{jpn\}\})\s*==(.*?)(?=\n==[^=]|\Z)", text, re.S)
    body = m.group(1) if m else text
    words = []
    for line in body.splitlines():
        # 「*【[[夫妻]]】…」の【】の中だけを見る（説明の文は取らない）
        m = re.match(r"[*#]+\s*【(.*?)】", line)
        if m:
            for w in re.findall(r"\[\[([^\]|#]+)", m.group(1)):
                if w not in words:
                    words.append(w)
    return words


def _search(yomi):
    """読みを本文に含むページの題を取る（かなの見出しが無い読みのため）。"""
    d = _get({"action": "query", "list": "search", "srsearch": f'"{yomi}"', "srnamespace": "0", "srlimit": "20", "srprop": ""})
    # 検索はあいまいに当たるので、漢字を含む 6 字までの題だけ残す（候補。人が見る）
    return [h["title"] for h in d["query"]["search"]
            if h["title"] != yomi and len(h["title"]) <= 6 and re.search(r"[一-鿿々]", h["title"])]


def lookup(yomi, cache):
    if yomi not in cache:
        cache[yomi] = {"kana": _kana_page(yomi), "search": _search(yomi)}
    return cache[yomi]


def main(args):
    if not args:
        print(__doc__)
        return 1
    try:
        with open(CACHE, encoding="utf-8") as f:
            cache = json.load(f)
    except (OSError, ValueError):
        cache = {}
    try:
        for y in args:
            r = lookup(y, cache)
            url = "https://ja.wiktionary.org/wiki/" + urllib.parse.quote(y)
            print(f"{y}\tかなの見出し: {'・'.join(r['kana']) or 'なし'}\t{url}")
            print(f"{y}\t読みでの検索: {'・'.join(r['search']) or 'なし'}")
    finally:
        os.makedirs(os.path.dirname(CACHE), exist_ok=True)
        with open(CACHE, "w", encoding="utf-8") as f:
            json.dump(cache, f, ensure_ascii=False, indent=1)
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
