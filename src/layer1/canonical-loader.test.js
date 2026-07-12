"use strict";
// =============================================================
// HNS Layer 1 — Canonical Loader テスト（依存なし・Node標準のみ）
// 設計 §12.1 P0 Exit Criteria / §13 Initial Test Cases を検証。
//   CE-02 Rename Stability   : 表示名を変えてもID不変
//   CE-03 Row Movement       : 行順を変えてもID不変
//   CE-04 Parser Mock (PI-02): モックParser経由・YAML不要でLoad成立
//   CE-07 Parser Isolation   : Loaderに YAMLライブラリ依存が無い
// 併せて Provenance First・必須欠落検出・未知語彙の非推測変換を確認。
// =============================================================
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { load } = require("./canonical-loader.js");
const { createMockParserAdapter } = require("./mock-parser-adapter.js");

let passed = 0;
function ok(name, cond) { assert.ok(cond, name); console.log(`  ok - ${name}`); passed++; }

// 最小 idResolver：安定ソース識別子ベース（行位置・表示名に非依存）
const idResolver = {
  async resolve({ entityType, stableSourceIdentifier }) {
    if (stableSourceIdentifier == null) return { ok: false };
    return { ok: true, id: `HNS:${entityType}:${stableSourceIdentifier}` };
  },
};

// 最小 vocabularyMapper：未知値は推測変換せず ok:false（§6.4）
const STATUS_MAP = { "採用": "active", "裁定待ち": "pending", "Draft": "draft" };
const vocabularyMapper = {
  mapStatus(sourceValue) {
    const key = String(sourceValue);
    if (Object.prototype.hasOwnProperty.call(STATUS_MAP, key)) {
      return { ok: true, value: STATUS_MAP[key], sourceValue, mappingId: `status:${key}` };
    }
    return { ok: false, sourceValue, error: null };
  },
};

const profile = {
  sourceClass: "primary_source",
  entitySelector: "admin_divisions",
  entityType: "administrative_area",
  fieldMappings: [
    { target: "stableSourceIdentifier", sourceKey: "id" },
    { target: "canonicalName", sourceKey: "fictional" },
    { target: "status", sourceKey: "verdict" },
  ],
  requiredFields: ["id", "fictional"],
};

function docFrom(rows) {
  return {
    sourceId: "admin_master",
    sourcePath: "data/hns_admin_division_master.yaml",
    value: { admin_divisions: rows },
    metadata: { parserFormat: "yaml", specification: "YAML 1.2", comments: [], locations: {} },
  };
}
const idFor = sid => `HNS:administrative_area:${sid}`;

(async () => {
  // CE-04 / PI-02
  {
    const adapter = createMockParserAdapter({
      sourceId: "admin_master",
      value: { admin_divisions: [{ id: "A006", fictional: "神府道", verdict: "採用" }] },
    });
    const parsed = await adapter.parse();
    const r = await load({ document: parsed.document, sourceProfile: profile, idResolver, vocabularyMapper });
    ok("CE-04 モックParser経由でLoad成立（YAML不要）", r.errors.length === 0 && r.entities.length === 1);
    ok("CE-04 status語彙マッピング（採用→active）", r.entities[0].status === "active");
    ok("Provenance First: 最低1件保持", r.entities[0].provenance.length >= 1);
    ok("Provenance→Source ID 追跡可", r.entities[0].provenance[0].sourceId === "admin_master");
  }

  // CE-02 Rename Stability
  {
    const a = await load({ document: docFrom([{ id: "A006", fictional: "神府道", verdict: "採用" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    const b = await load({ document: docFrom([{ id: "A006", fictional: "改称後名", verdict: "採用" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    ok("CE-02 改名後もID不変", a.entities[0].id === b.entities[0].id && a.entities[0].id === idFor("A006"));
    ok("CE-02 canonicalNameは更新される", a.entities[0].canonicalName !== b.entities[0].canonicalName);
  }

  // CE-03 Row Movement
  {
    const forward = await load({ document: docFrom([
      { id: "A006", fictional: "神府道", verdict: "採用" },
      { id: "A007", fictional: "火守道", verdict: "採用" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    const reversed = await load({ document: docFrom([
      { id: "A007", fictional: "火守道", verdict: "採用" },
      { id: "A006", fictional: "神府道", verdict: "採用" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    ok("CE-03 行順変更後もID集合が一致", JSON.stringify(forward.entities.map(e => e.id).sort()) === JSON.stringify(reversed.entities.map(e => e.id).sort()));
    ok("CE-03 A006のIDは行位置非依存", forward.entities.some(e => e.id === idFor("A006")) && reversed.entities.some(e => e.id === idFor("A006")));
  }

  // 必須欠落 → LOAD_REQUIRED_FIELD_MISSING（部分成功: entityは生成しない）
  {
    const r = await load({ document: docFrom([{ id: "A003", verdict: "未提出" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    ok("必須欠落を検出しentity非生成", r.errors.some(e => e.code === "LOAD_REQUIRED_FIELD_MISSING") && r.entities.length === 0);
  }

  // 未知語彙 → 推測変換せず unknown ＋ WARN
  {
    const r = await load({ document: docFrom([{ id: "A002", fictional: "谷背", verdict: "要修正" }]), sourceProfile: profile, idResolver, vocabularyMapper });
    ok("未知語彙は unknown＋WARN（推測変換しない）", r.entities[0].status === "unknown" && r.warnings.some(w => w.code === "WARN_UNKNOWN_VOCABULARY"));
  }

  // CE-07 Parser Isolation（静的検索: LoaderにYAMLライブラリ参照が無い）
  {
    const src = fs.readFileSync(path.join(__dirname, "canonical-loader.js"), "utf8");
    const hasYamlLib = /require\(\s*['"](?:js-yaml|yaml)['"]\s*\)/.test(src) || /from\s+['"](?:js-yaml|yaml)['"]/.test(src);
    ok("CE-07 LoaderにYAMLライブラリ参照なし", hasYamlLib === false);
  }

  console.log(`\n${passed} checks passed.`);
})().catch(e => { console.error(e); process.exit(1); });
