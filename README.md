Trabalho Realizado em Grupo, Ramon e Everton


😎 Aluno/Empregado: Ramon Marques Coutinho

MATRICULA: C078969-0

Assistente Pleno

CESOB

😎 Aluno/Empregado: Everton Lucas Fernandes

Matrícula: C150907-1

Assistente Pleno

CESOA

♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
---------------------------------------------------------------------------


# Dicas da Juju

Site institucional simples de receitas publicado com Node.js, Nginx e Docker.

## Arquitetura

A aplicação usa uma arquitetura monolítica simples:

```text
Usuário → Nginx (porta 8080) → Aplicação Node.js (porta 3000)
                                         ↓
                               Arquivos estáticos
```

O diagrama visual está em [docs/arquitetura.svg](docs/arquitetura.svg).

## Estrutura

```text
public/
  css/style.css
  js/main.js
  images/
  receita-salada.html
  receita-torta.html
  receita-sopa.html
server.js
Dockerfile
docker-compose.yml
nginx/nginx.conf
.github/workflows/ci-cd.yml
docs/arquitetura.svg
docs/ADD.md
```

## Executar localmente sem Docker

Requisitos: Node.js 18 ou superior.

```powershell
npm install
npm start
```

Abra `http://localhost:3000`.

## Executar com Docker

Requisitos: Docker Desktop ou Docker Engine.

```powershell
docker compose up --build
```

Abra `http://localhost:8080`.

Parar os containers:

```powershell
docker compose down
```

## Simular um domínio

Este projeto usa o domínio local `dicasdajujulocal.local`. Para simulá-lo no Windows:

1. Abra o Bloco de Notas como administrador.
2. Abra `C:\Windows\System32\drivers\etc\hosts`.
3. Adicione:

```text
127.0.0.1 dicasdajujulocal.local
```

4. Execute `docker compose up --build`.
5. Abra `http://dicasdajujulocal.local:8080`.

## CI/CD

O workflow em `.github/workflows/ci-cd.yml` é executado em pushes e pull requests para a branch `main`. Ele instala dependências, executa os testes e constrói a imagem Docker.

Em produção, o pipeline poderia fazer login em Docker Hub ou GitHub Container Registry e publicar a imagem após o build.

## Testes

```powershell
npm test
npm run validate:compose
```

## Evidência visual

O funcionamento via navegador foi registrado em [docs/print-localhost.png](docs/print-localhost.png).

## Servidor e decisões técnicas

- **Servidor web:** Nginx atua como proxy reverso.
- **Aplicação:** Node.js atende os arquivos estáticos e verifica saúde em `/health`.
- **Domínio:** simulado com o arquivo `hosts`, sem custo de registro.
- **CI/CD:** GitHub Actions executa testes e build.
- **Container:** Docker Compose orquestra aplicação e proxy.

As justificativas completas estão no documento [ADD](docs/ADD.md).
