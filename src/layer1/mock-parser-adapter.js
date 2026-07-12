"use strict";
// =============================================================
// HNS Layer 1 — Mock Parser Adapter（テスト用・設計 §7 / PI-02）
//
// 固定の in-memory オブジェクトを ParsedDocument として返すだけの差替え実装。
// YAMLの解析は行わない。Canonical Loader を「パーサ非依存」で検証するために使う。
// PI-02: 本モックへ差し替えた状態で Loader 単体テストが成立すること。
// =============================================================

/**
 * @param {{sourceId:string, sourcePath?:(string|null), value:*, comments?:Object[], locations?:Object}} fixture
 * @returns {{parse: function(*=): Promise<{ok:true, document:Object}>}}
 */
function createMockParserAdapter(fixture) {
  return {
    async parse() {
      return {
        ok: true,
        document: {
          sourceId: fixture.sourceId,
          sourcePath: fixture.sourcePath ?? null,
          value: fixture.value,
          metadata: {
            parserFormat: "yaml",
            specification: "YAML 1.2",
            comments: fixture.comments || [],
            locations: fixture.locations || {},
          },
        },
      };
    },
  };
}

module.exports = { createMockParserAdapter };
