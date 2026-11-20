# Registro de Decisões Arquiteturais (ADD)

## Contexto

O projeto precisa publicar um site institucional de receitas de forma simples, reproduzível e com separação clara entre servidor web, aplicação e entrega automática.

## ADD-01: Servidor da aplicação

- **Decisão:** Node.js com módulo HTTP nativo.
- **Motivos:** a aplicação é estática e não exige framework nem banco de dados. O módulo nativo reduz dependências e acelera a imagem Docker.
- **Alternativas consideradas:** Express e Nginx servindo arquivos diretamente.
- **Consequência:** o Nginx continua responsável pelo acesso externo e o Node responde apenas no ambiente interno da rede Docker.

## ADD-02: Proxy reverso

- **Decisão:** Nginx.
- **Motivos:** amplamente utilizado, leve e adequado para publicar o serviço na porta HTTP 8080.
- **Alternativas consideradas:** Apache.
- **Consequência:** a configuração fica em `nginx/nginx.conf` e o roteamento externo para o app acontece pela rede Docker.

## ADD-03: Conteinerização

- **Decisão:** Docker Compose com dois serviços: `app` e `nginx`.
- **Motivos:** permite levantar a arquitetura completa com um único comando e mantém os processos separados.
- **Alternativas consideradas:** executar tudo em uma única imagem.
- **Consequência:** o projeto segue uma arquitetura monolítica simples, com componentes separados em containers.

## ADD-04: Front-end

- **Decisão:** HTML, CSS e JavaScript puros.
- **Motivos:** atende ao objetivo institucional, exige poucas ferramentas e permite demonstrar imagens em subpastas do projeto.
- **Alternativas consideradas:** React ou outro framework.
- **Consequência:** não há etapa de compilação front-end e os arquivos podem ser copiados diretamente pela imagem.

## ADD-05: CI/CD

- **Decisão:** GitHub Actions.
- **Motivos:** integração nativa com repositórios GitHub e configuração declarativa em YAML.
- **Alternativas consideradas:** GitLab CI e Jenkins.
- **Consequência:** pushes e pull requests executam instalação, testes e build da imagem. Publicação em registro externo não foi ativada por não haver credenciais.

## ADD-06: Domínio

- **Decisão:** simulação com `dicasdajujulocal.local` no arquivo `hosts` local.
- **Motivos:** permite demonstrar um endereço amigável sem registrar ou comprar domínio.
- **Alternativas consideradas:** provedores como Registro.br, Hostinger e Cloudflare.
- **Consequência:** em produção seria necessário registrar o domínio, apontar DNS, configurar HTTPS e publicar a aplicação.
