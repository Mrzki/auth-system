const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("POST /auth/register", () => {
  it("berhasil register dengan data valid", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Budi",
      email: "budi@test.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Berhasil Register");
    expect(response.body.data).toHaveProperty("email", "budi@test.com");
    expect(response.body.data).not.toHaveProperty("password");
  });

  it("gagal register jika data tidak lengkap", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Budi",
      email: "budi@test.com",
    });

    expect(response.status).toBe(400);
  });

  it("gagal register jika email sudah terdaftar", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Budi",
      email: "budi@test.com",
      password: "password123",
    });

    expect(response.status).toBe(409);
  });
});

describe("POST /auth/login", () => {
  it("berhasil login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "budi@test.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
  });

  it("password salah, gagal login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "budi@test.com",
      password: "passwordSalah",
    });

    expect(response.status).toBe(401);
  });

  it("email tidak terdaftar, gagal login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "rayhan@test.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
