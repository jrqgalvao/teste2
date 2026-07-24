import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

async function render() {
  const port = 4317 + (process.pid % 1000);
  const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  const server = spawn(process.execPath, [nextCli, "start", "-p", String(port)], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    stdio: "ignore",
  });

  try {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      try {
        const response = await fetch(`http://localhost:${port}/`);
        if (response.status === 200) return response;
      } catch {
        // The server may need a moment to start.
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw new Error("Next production server did not start in time");
  } finally {
    server.kill();
  }
}

test("renderiza a página inicial da Pousada Lua Rosa", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Pousada Lua Rosa \| Praia do Rosa, Santa Catarina<\/title>/i);
  assert.match(html, /Ver disponibilidade no Booking/);
  assert.match(html, /booking\.com\/hotel\/br\/pousada-lua-rosa\.pt-br\.html/);
  assert.match(html, /Estrada Geral do Rosa, S\/N/);
  assert.match(html, /Dias para ir sem pressa/);
  assert.match(html, /Planejar meus dias no Rosa/);
  assert.match(html, /Seu próximo destino/);
  assert.doesNotMatch(html, /5500000000000|provisório|inserir antes da publicação/i);
  assert.doesNotMatch(html, /Pousada Sentiero/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
