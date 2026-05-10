import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import Fastify from "fastify";
import sensible from "@fastify/sensible";

vi.mock("../src/repositories/book.repository", () => ({
  BookRepository: function () {
    return {};
  },
}));

vi.mock("../src/repositories/user.repository", () => ({
  UserRepository: function () {
    return {};
  },
}));

vi.mock("../src/services/book.service", () => ({
  BookService: function () {
    return {
      createBook: vi.fn().mockResolvedValue({}),
      findAllBooks: vi.fn().mockResolvedValue([]),
    };
  },
}));

vi.mock("../src/services/user.service", () => ({
  UserService: function () {
    return {
      createUser: vi.fn().mockResolvedValue({}),
    };
  },
}));

import bookRoutes from "../src/routes/book.routes";
import userRoutes from "../src/routes/user.routes";

const buildApp = async () => {
  const app = Fastify();
  await app.register(sensible);
  await app.register(bookRoutes);
  await app.register(userRoutes);
  await app.ready();
  return app;
};

// ─── POST /user/create ───────────────────────────────────────────────────────

describe("POST /user/create", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  beforeAll(async () => {
    app = await buildApp();
  });
  afterAll(async () => {
    await app.close();
  });

  it("201 com dados válidos", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/user/create",
      payload: {
        name: "João Silva",
        email: "joao@email.com",
        avatarUrl: "https://foto.com/1.jpg",
      },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toEqual({ message: "Usuário criado com sucesso!" });
  });

  it("400 com nome curto", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/user/create",
      payload: {
        name: "Jo",
        email: "joao@email.com",
        avatarUrl: "https://foto.com/1.jpg",
      },
    });
    expect(res.statusCode).toBe(400);
  });

  it("400 com email inválido", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/user/create",
      payload: {
        name: "João Silva",
        email: "nao-e-email",
        avatarUrl: "https://foto.com/1.jpg",
      },
    });
    expect(res.statusCode).toBe(400);
  });
});

// ─── POST /book/create ───────────────────────────────────────────────────────

describe("POST /book/create", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  beforeAll(async () => {
    app = await buildApp();
  });
  afterAll(async () => {
    await app.close();
  });

  const base = {
    title: "Clean Code",
    author: "Robert Martin",
    publishedYear: 2008,
    user: "joao@email.com",
  };

  it("201 com dados válidos", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/book/create",
      payload: base,
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toEqual({ message: "Livro cadastrado com sucesso!" });
  });

  it("400 com título curto", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/book/create",
      payload: { ...base, title: "AB" },
    });
    expect(res.statusCode).toBe(400);
  });

  it("400 com ano no futuro", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/book/create",
      payload: { ...base, publishedYear: new Date().getFullYear() + 1 },
    });
    expect(res.statusCode).toBe(400);
  });

  it("400 com email inválido", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/book/create",
      payload: { ...base, user: "nao-e-email" },
    });
    expect(res.statusCode).toBe(400);
  });
});

// ─── GET /book ───────────────────────────────────────────────────────────────

describe("GET /book", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  beforeAll(async () => {
    app = await buildApp();
  });
  afterAll(async () => {
    await app.close();
  });

  it("200 sem filtro", async () => {
    const res = await app.inject({ method: "GET", url: "/book" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toHaveProperty("foundBooks");
  });

  it("200 com filtro de título", async () => {
    const res = await app.inject({ method: "GET", url: "/book?title=Clean" });
    expect(res.statusCode).toBe(200);
  });
});
