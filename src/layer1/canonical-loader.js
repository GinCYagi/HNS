"use strict";
// =============================================================
// HNS Layer 1 — Canonical Loader（意味解析層）
// 設計: docs/design/canonical-entity-model-v0.1.md  §3.1 / §4 / §6 / §8 / §9 / §10
//
// 責務: Parsed Document（Parser Adapterの構文解析結果）→ Canonical Entity（中立表現）。
// 禁止: YAMLライブラリの直接利用／Parser固有型・例外の参照（PI-01）。
//       本モジュールは YAML に一切依存しない（Parser Isolation）。構文解析は行わない。
//
// 注記（設計本文で型が未定義のため、本実装で最小定義した箇所・要Crd確認）:
//   - FieldMapping        （§8.2は fieldMappings: FieldMapping[] と参照するが型未記載）
//   - CanonicalIdResult   （§9.1 resolve の戻り型名が未記載 → {ok,id} 形で仮定）
//   確定後に差し替え可能な最小形とし、意味論には踏み込まない。
// =============================================================

/**
 * @typedef {Object} FieldMapping   // ★最小定義（設計未記載・要Crd確認）
 * @property {string} target        // Canonicalフィールド名
 * @property {string} sourceKey     // ソース文書上のキー
 *
 * @typedef {Object} SourceProfile  // §8.2 の本増分で使用する部分集合
 * @property {string} sourceClass
 * @property {string} entitySelector
 * @property {string} entityType
 * @property {FieldMapping[]} fieldMappings
 * @property {string[]} requiredFields
 * @property {("preserve"|"warn"|"reject")} [unknownFieldPolicy]
 */

function selectCollection(value, selector) {
  if (value == null || typeof value !== "object") return undefined;
  return value[selector];
}

function sourceKeyFor(fieldMappings, target) {
  const fm = fieldMappings.find(m => m.target === target);
  return fm ? fm.sourceKey : null;
}

function makeError(code, sourceId, sourceKey, message) {
  return { layer: "loader", code, message, sourceId, sourceKey: sourceKey ?? null, location: null, severity: "error" };
}
function makeWarning(code, sourceId, sourceKey, message) {
  return { layer: "loader", code, message, sourceId, sourceKey: sourceKey ?? null, location: null, severity: "warning" };
}

/**
 * §8.1 CanonicalLoader.load
 * @param {{document:Object, sourceProfile:SourceProfile, idResolver:Object, vocabularyMapper:Object}} input
 * @returns {Promise<{entities:Object[], errors:Object[], warnings:Object[]}>}  部分成功を許容（§8.3）
 */
async function load(input) {
  const { document, sourceProfile, idResolver, vocabularyMapper } = input;
  const entities = [];
  const errors = [];
  const warnings = [];

  const collection = selectCollection(document.value, sourceProfile.entitySelector);
  if (!Array.isArray(collection)) {
    errors.push(makeError("LOAD_STRUCTURE_INVALID", document.sourceId, sourceProfile.entitySelector,
      `entitySelector '${sourceProfile.entitySelector}' が配列を指していません`));
    return { entities, errors, warnings };
  }

  const nameKey = sourceKeyFor(sourceProfile.fieldMappings, "canonicalName");
  const idKey = sourceKeyFor(sourceProfile.fieldMappings, "stableSourceIdentifier");
  const statusKey = sourceKeyFor(sourceProfile.fieldMappings, "status");
  const locations = (document.metadata && document.metadata.locations) || {};

  for (let index = 0; index < collection.length; index++) {
    const raw = collection[index];

    // 必須項目検証（§8.4 LOAD_REQUIRED_FIELD_MISSING）
    const missing = sourceProfile.requiredFields.filter(f => raw == null || raw[f] == null);
    if (missing.length) {
      errors.push(makeError("LOAD_REQUIRED_FIELD_MISSING", document.sourceId, missing.join(","),
        `必須項目欠落: ${missing.join(", ")}`));
      continue;
    }

    const canonicalName = String(raw[nameKey]);
    const stableSourceIdentifier = idKey != null && raw[idKey] != null ? String(raw[idKey]) : null;
    const entityType = sourceProfile.entityType || "unknown";

    // 状態語彙マッピング（§6.4: 未知は推測変換しない）
    let status = "unknown";
    if (statusKey != null && raw[statusKey] != null) {
      const mapped = vocabularyMapper.mapStatus(raw[statusKey]);
      if (mapped && mapped.ok) status = mapped.value;
      else warnings.push(makeWarning("WARN_UNKNOWN_VOCABULARY", document.sourceId, statusKey,
        `未知の状態語彙: ${JSON.stringify(raw[statusKey])}`));
    }

    // Internal ID 解決（§9: 行位置・表示名に非依存）
    const idResult = await idResolver.resolve({
      sourceClass: sourceProfile.sourceClass,
      sourceId: document.sourceId,
      sourceKey: stableSourceIdentifier,
      entityType,
      stableSourceIdentifier,
      canonicalName,
    });
    if (!idResult || idResult.ok !== true) {
      errors.push(makeError("LOAD_ID_UNRESOLVED", document.sourceId, stableSourceIdentifier,
        "Internal ID を解決できません"));
      continue;
    }

    // Provenance（§3.4 Provenance First: 最低1件）
    const provenance = [{
      provenanceId: `${document.sourceId}#${stableSourceIdentifier ?? index}`,
      sourceClass: sourceProfile.sourceClass,
      sourceId: document.sourceId,
      sourcePath: document.sourcePath ?? null,
      sourceKey: stableSourceIdentifier,
      sourceLocation: locations[String(stableSourceIdentifier)] || null,
      sourceValue: raw,
      role: "definition",
      note: null,
    }];

    entities.push({
      id: idResult.id,
      entityType,
      canonicalName,
      displayNames: [{ value: canonicalName, language: null, script: null, usage: "primary" }],
      status,
      confidence: null,
      parentId: null,          // §10 parent解決は後続増分。未解決は null。
      relations: [],
      attributes: {},
      tags: [],
      provenance,
      sourceState: "resolved",
      notes: [],
      createdAt: null,
      updatedAt: null,
    });
  }

  return { entities, errors, warnings };
}

module.exports = { load };
