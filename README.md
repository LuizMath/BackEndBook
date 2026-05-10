# 📚 Juridiq Books — Backend

API REST do Juridiq Books, construída com **Fastify**, **Prisma** e **MySQL**.

---

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [MySQL](https://dev.mysql.com/downloads/) rodando localmente (via instalador ou MySQL Workbench)

---

## 📦 Instalação

```bash
git clone https://github.com/LuizMath/BackEndBook.git
cd BackEndBook
npm install
```

---

## ⚙️ Variáveis de ambiente

Crie o arquivo **`.env`** na raiz do projeto:

```
BackEndBook/
├── .env        ← aqui
├── src/
├── prisma/
└── ...
```

```dotenv
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/book"
DATABASE_USER="seu_usuario"
DATABASE_PASSWORD="sua_senha"
DATABASE_NAME="book"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

---

## 🗄️ Criando o banco de dados

### Opção 1 — MySQL Workbench

1. Abra o **MySQL Workbench** e clique na sua conexão local para abrir
2. Uma aba de query abrirá automaticamente — se não aparecer, clique no ícone **SQL+** no canto superior esquerdo
3. Digite e execute (selecione e pressione **Ctrl+Enter** ou clique no raio ⚡):

```sql
CREATE DATABASE book;
USE book;
```

4. O banco `book` aparecerá no painel **Schemas** à esquerda (atualize se necessário)

### Opção 2 — Terminal

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS book;"
```

---

## 🔄 Migrations

Após criar o banco, rode as migrations para criar as tabelas:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

API disponível em: `http://localhost:3001`

---

## 🧪 Testes

```bash
npm test          # roda uma vez
npm run test:watch    # fica assistindo mudanças
npm run test:coverage # com cobertura
```

Adicione ao `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

---

## 📡 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/user/create` | Cria um usuário |
| `POST` | `/book/create` | Cadastra um livro |
| `GET`  | `/book` | Lista livros (filtro opcional: `?title=`) |
