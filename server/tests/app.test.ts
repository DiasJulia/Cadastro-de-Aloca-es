import request from "supertest";
import { app } from "../src";
import { TestHelper } from "../utils/testHelper";

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
});

afterAll(() => {
  TestHelper.instance.teardownTestDB();
});

// Mock uma instância de Request e Response para testes
const mockRequest = (body: any = {}) => {
  return {
    body,
  };
};

describe("API Endpoints", () => {
  it("should ping", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Pong!");
  });
});

describe("OperacaoController", () => {
  it("should create a new operation", async () => {
    const req = mockRequest({
      CNPJ: "123456789",
      razao_social: "Sample Company",
      tipo: 1,
      data: "2023-10-03",
      quantidade: 100,
      valor: 500.0,
    });
    const res = await request(app).post("/api/operacao").send(req.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("CNPJ");
    expect(res.body).toHaveProperty("razao_social");
    expect(res.body).toHaveProperty("tipo");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("quantidade");
    expect(res.body).toHaveProperty("valor");
  });

  it("should read all operations", async () => {
    const res = await request(app).get("/api/operacao");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("CNPJ");
      expect(res.body[0]).toHaveProperty("razao_social");
      expect(res.body[0]).toHaveProperty("tipo");
      expect(res.body[0]).toHaveProperty("data");
      expect(res.body[0]).toHaveProperty("quantidade");
      expect(res.body[0]).toHaveProperty("valor");
    }
  });

  it("should update an operation", async () => {
    const setupReq = mockRequest({
      CNPJ: "123456789",
      razao_social: "Sample Company",
      tipo: 1,
      data: "2023-10-03",
      quantidade: 100,
      valor: 500.0,
    });
    const setupRes = await request(app)
      .post("/api/operacao")
      .send(setupReq.body);
    expect(setupRes.status).toBe(201);
    const setupId = setupRes.body.id;

    const req = mockRequest({
      CNPJ: "123456789",
      razao_social: "Sample Company 2",
      tipo: 1,
      data: "2023-10-03",
      quantidade: 100,
      valor: 500.0,
    });
    const res = await request(app)
      .put("/api/operacao/" + setupId)
      .send(req.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("CNPJ");
    expect(res.body).toHaveProperty("razao_social");
    expect(res.body).toHaveProperty("tipo");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("quantidade");
    expect(res.body).toHaveProperty("valor");
    expect(res.body.razao_social).toBe("Sample Company 2");
  });

  it("should delete an operation", async () => {
    const setupReq = mockRequest({
      CNPJ: "123456789",
      razao_social: "Sample Company",
      tipo: 1,
      data: "2023-10-03",
      quantidade: 100,
      valor: 500.0,
    });
    const setupRes = await request(app)
      .post("/api/operacao")
      .send(setupReq.body);
    expect(setupRes.status).toBe(201);
    const setupId = setupRes.body.id;

    const res = await request(app).delete("/api/operacao/" + setupId);
    expect(res.status).toBe(200);
  });
});
