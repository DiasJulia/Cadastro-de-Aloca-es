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

const mockCreate = async (body: any = {}) => {
  const req = mockRequest(body);
  const res = await request(app).post("/api/operacao").send(req.body);
  expect(res.status).toBe(201);
  return res;
};

describe("FundoController", () => {
  it("should load funds from CSV", async () => {
    const req = mockRequest({
      cnpj: "00.017.024/0001-53",
      data: "2022-10-02",
    });
    const res = await request(app).post("/api/fundo").send(req.body);
    expect(res.status).toBe(201);
  });

  it("should read funds by CNPJ and date from loaded data", async () => {
    const cnpj = "00.017.024/0001-53";
    const data = "2022-10-04";
    const res = await request(app).get(`/api/fundo?cnpj=${cnpj}&data=${data}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("valor");
    expect(res.body.valor).toBe(30.1551596);
  });

  it("should read funds by CNPJ and date from data that was not loaded", async () => {
    const cnpj = "00.017.024/0001-53";
    const data = "2022-11-07";
    const res = await request(app).get(`/api/fundo?cnpj=${cnpj}&data=${data}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("valor");
    expect(res.body.valor).toBe(30.4291225);
  });

  //   it("should read funds by CNPJ", async () => {
  //     // Simule a criação de fundos no banco de dados de teste.
  //     // Em seguida, faça uma solicitação GET para buscar fundos por CNPJ.
  //     const cnpj = "00.017.024/0001-53";
  //     const res = await request(app).get(`/api/fundo?cnpj=${cnpj}`);
  //     expect(res.status).toBe(200);
  //     // Adicione as asserções apropriadas de acordo com a lógica do seu controlador.
  //   });
});
