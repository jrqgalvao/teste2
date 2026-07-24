import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
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
