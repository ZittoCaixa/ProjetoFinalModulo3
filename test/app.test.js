const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const YAML = require("yaml");

test("a pagina principal existe e contem o titulo do projeto", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "public", "index.html"), "utf8");
  assert.match(html, /Dicas da Juju/);
  assert.match(html, /Receitas em destaque/);
});

test("todos os arquivos estaticos essenciais existem", () => {
  const files = [
    "public/css/style.css",
    "public/js/main.js",
    "public/images/hero-salada.svg",
    "public/images/macarrao.svg",
    "public/images/bolo.svg",
    "public/images/panqueca.svg",
    "public/images/salada.svg",
    "public/images/torta.svg",
    "public/images/sopa.svg"
  ];

  files.forEach((file) => {
    assert.equal(fs.existsSync(path.join(__dirname, "..", file)), true, file);
  });
});

test("arquivos Docker e CI/CD estao presentes", () => {
  assert.equal(fs.existsSync(path.join(__dirname, "..", "Dockerfile")), true);
  assert.equal(fs.existsSync(path.join(__dirname, "..", "docker-compose.yml")), true);
  assert.equal(fs.existsSync(path.join(__dirname, "..", "nginx", "nginx.conf")), true);
  assert.equal(fs.existsSync(path.join(__dirname, "..", ".github", "workflows", "ci-cd.yml")), true);
});

test("paginas de receita estao presentes", () => {
  ["receita-salada.html", "receita-torta.html", "receita-sopa.html"].forEach((file) => {
    assert.equal(fs.existsSync(path.join(__dirname, "..", "public", file)), true, file);
  });
});

test("o servidor responde na pagina principal e no health check", async () => {
  const { server } = require("../server");
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    const pageResponse = await fetch(baseUrl);
    assert.equal(pageResponse.status, 200);
    assert.match(await pageResponse.text(), /Dicas da Juju/);

    const healthResponse = await fetch(`${baseUrl}/health`);
    assert.equal(healthResponse.status, 200);
    assert.deepEqual(await healthResponse.json(), { status: "ok", service: "dicas-da-juju" });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("docker-compose contem os servicos app e nginx", () => {
  const compose = YAML.parse(fs.readFileSync(path.join(__dirname, "..", "docker-compose.yml"), "utf8"));
  assert.ok(compose.services.app);
  assert.ok(compose.services.nginx);
});
