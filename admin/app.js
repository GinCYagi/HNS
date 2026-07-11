const queue = document.querySelector("#queue");
const glossaryPanel = document.querySelector("#glossary-panel");
const glossaryList = document.querySelector("#glossary-list");

document.querySelector("#reload").addEventListener("click", load);
document.querySelector("#glossary-open").addEventListener("click", () => {
  glossaryPanel.classList.add("open");
});
document.querySelector("#glossary-close").addEventListener("click", () => {
  glossaryPanel.classList.remove("open");
});

const labels = {
  Approved: "採用",
  Rejected: "不採用",
  Deferred: "保留",
  Pending: "裁定待ち"
};

let glossaryMap = new Map();

async function load() {
  queue.innerHTML = "<p>読込中…</p>";

  const [decisionRes, glossaryRes] = await Promise.all([
    fetch("/api/decisions", { cache: "no-store" }),
    fetch("/data/glossary.json", { cache: "no-store" })
  ]);

  const data = await decisionRes.json();
  const glossary = await glossaryRes.json();

  glossaryMap = new Map(glossary.terms.map(term => [term.key, term]));
  renderGlossary(glossary.terms);

  queue.innerHTML = "";
  data.decisions.forEach(renderCard);
}

function renderGlossary(terms) {
  glossaryList.innerHTML = "";
  terms.forEach(term => {
    const item = document.createElement("section");
    item.className = "glossary-item";
    item.innerHTML = `
      <h3><code>${escapeHtml(term.key)}</code> ${escapeHtml(term.ja)}</h3>
      <p class="glossary-name">${escapeHtml(term.name)}</p>
      <p>${escapeHtml(term.description)}</p>
      ${term.example ? `<p class="glossary-example">例：${escapeHtml(term.example)}</p>` : ""}
    `;
    glossaryList.appendChild(item);
  });
}

function tooltip(termKey) {
  const term = glossaryMap.get(termKey);
  if (!term) return "";
  return `${term.key} / ${term.name} / ${term.ja}\n${term.description}`;
}

function termBadge(termKey) {
  const term = glossaryMap.get(termKey);
  if (!term) return `<code>${escapeHtml(termKey)}</code>`;
  return `
    <span class="term-badge" tabindex="0" title="${escapeHtml(tooltip(termKey))}">
      <code>${escapeHtml(term.key)}</code>
      <span>${escapeHtml(term.ja)}</span>
    </span>
  `;
}

function renderCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const status = document.createElement("span");
  status.className = `status status-${item.status.toLowerCase()}`;
  status.textContent = labels[item.status] || item.status;
  status.title = tooltip(item.status);

  card.innerHTML = `
    <div class="card-head">
      <div>
        <p class="meta">${escapeHtml(item.priority)} · ${escapeHtml(item.decisionId)}</p>
        <h2>${escapeHtml(item.target)}</h2>
      </div>
    </div>
    <dl>
      <dt>裁定事項</dt><dd>${escapeHtml(item.question)}</dd>
      <dt>推奨</dt><dd>${escapeHtml(item.recommendedAction)}</dd>
      <dt>状態</dt><dd>${termBadge(item.status)}</dd>
      <dt>現在の注記</dt><dd>${escapeHtml(item.note || "—")}</dd>
    </dl>
    <label>裁定理由・注記
      <textarea rows="3" placeholder="必要な場合のみ入力">${escapeHtml(item.note || "")}</textarea>
    </label>
    <div class="actions">
      <button data-status="Approved" title="${escapeHtml(tooltip("Approved"))}">採用</button>
      <button data-status="Rejected" title="${escapeHtml(tooltip("Rejected"))}">不採用</button>
      <button data-status="Deferred" title="${escapeHtml(tooltip("Deferred"))}">保留</button>
    </div>
    <p class="result"></p>
  `;

  card.querySelector(".card-head").appendChild(status);
  card.querySelectorAll("[data-status]").forEach(button => {
    button.addEventListener("click", () => decide(item.decisionId, button.dataset.status, card));
  });
  queue.appendChild(card);
}

async function decide(decisionId, status, card) {
  const note = card.querySelector("textarea").value;
  const result = card.querySelector(".result");

  if (!confirm(`${labels[status]}として記録しますか？`)) return;

  card.querySelectorAll("button").forEach(b => b.disabled = true);
  result.textContent = "保存中…";

  try {
    const res = await fetch("/api/decisions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decisionId, status, note })
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.error || "保存に失敗しました");
    result.textContent = "保存し、Markdownを再生成しました。";
    await load();
  } catch (error) {
    result.textContent = error.message;
    card.querySelectorAll("button").forEach(b => b.disabled = false);
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[ch]));
}

load();
