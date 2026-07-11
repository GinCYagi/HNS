const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const DATA_FILE = path.join(ROOT, "data", "decisions.json");
const BACKUP_DIR = path.join(ROOT, "backups");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function send(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": contentType, "Cache-Control": "no-store" });
  res.end(body);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function backup(file) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  fs.copyFileSync(file, path.join(BACKUP_DIR, `decisions-${stamp}.json`));
}

function regenerate(callback) {
  execFile(process.execPath, [path.join(ROOT, "scripts", "generate-registry.js")], { cwd: ROOT }, callback);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/decisions") {
    return send(res, 200, fs.readFileSync(DATA_FILE), MIME[".json"]);
  }

  if (req.method === "POST" && req.url === "/api/decisions") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on("end", () => {
      try {
        const input = JSON.parse(body);
        const allowed = new Set(["Approved", "Rejected", "Deferred"]);
        if (!input.decisionId || !allowed.has(input.status)) {
          return send(res, 400, JSON.stringify({ error: "Invalid decision payload" }), MIME[".json"]);
        }

        const doc = readJson(DATA_FILE);
        const target = doc.decisions.find(d => d.decisionId === input.decisionId);
        if (!target) return send(res, 404, JSON.stringify({ error: "Decision not found" }), MIME[".json"]);

        backup(DATA_FILE);
        target.status = input.status;
        target.decisionDate = new Date().toISOString().slice(0, 10);
        target.note = String(input.note || "").trim();
        doc.updatedAt = target.decisionDate;

        fs.writeFileSync(DATA_FILE, JSON.stringify(doc, null, 2) + "\n", "utf8");
        regenerate((error) => {
          if (error) return send(res, 500, JSON.stringify({ error: "Saved, but registry generation failed" }), MIME[".json"]);
          send(res, 200, JSON.stringify({ ok: true, decision: target }), MIME[".json"]);
        });
      } catch (error) {
        send(res, 400, JSON.stringify({ error: error.message }), MIME[".json"]);
      }
    });
    return;
  }

  const relative = req.url === "/" ? "admin/index.html" : req.url.replace(/^\/+/, "");
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT)) return send(res, 403, "Forbidden");
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, "Not found");

  const ext = path.extname(file);
  send(res, 200, fs.readFileSync(file), MIME[ext] || "application/octet-stream");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`HNS Asset Registry Admin: http://127.0.0.1:${PORT}`);
});
