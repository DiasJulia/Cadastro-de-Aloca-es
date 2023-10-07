import apiRouter from "../src/routes/ApiRoutes";
const request = require("supertest");
const express = require("express");
const app = express();

app.use("/api/consultaCVM", apiRouter);

describe("Testes para a rota /api/consultaCVM", () => {
  it("Deve retornar status 200 e um valor válido para um CNPJ e data válidos", async () => {
    const response = await request(app)
      .get("/api/consultaCVM")
      .query({ cnpj: "00.017.024/0001-53", data: "2023-10-05" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cotaValue");
    expect(typeof response.body.cotaValue).toBe("number");
  });

  it("Deve retornar status 400 para uma consulta sem CNPJ ou data", async () => {
    const response = await request(app).get("/api/consultaCVM");

    expect(response.status).toBe(400);
  });

  it("Deve retornar status 404 para um CNPJ ou data inválidos", async () => {
    const response = await request(app)
      .get("/api/consultaCVM")
      .query({ cnpj: "cnpj_invalido", data: "data_invalida" });

    expect(response.status).toBe(404);
  });
});
