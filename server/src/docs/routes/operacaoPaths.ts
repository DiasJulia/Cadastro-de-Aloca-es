import { operacaoResponse } from "../res/operacaoResponse";

const operacaoPaths = {
  "/operacao": {
    post: {
      tags: ["Operação"],
      summary: "Cria uma operação",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/operacao",
            },
            example: {
              CNPJ: "12345678901234",
              razao_social: "Empresa 1",
              data: "2021-01-01",
              valor: 1000,
              quantidade: 10,
              tipo: "COMPRA",
            },
          },
        },
      },
      responses: {
        ...operacaoResponse.create,
      },
    },
    get: {
      tags: ["Operação"],
      summary: "Lista todas as operações",
      responses: {
        ...operacaoResponse.readAll,
      },
    },
  },
  "/operacao/{id}": {
    put: {
      tags: ["Operação"],
      summary: "Atualiza uma operação",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID da operação",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/operacao",
            },
            example: {
              CNPJ: "12345678901234",
              razao_social: "Empresa 1",
              data: "2021-01-01",
              valor: 1000,
              quantidade: 10,
              tipo: "COMPRA",
            },
          },
        },
      },
      responses: {
        ...operacaoResponse.update,
      },
    },
    delete: {
      tags: ["Operação"],
      summary: "Deleta uma operação",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID da operação",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      responses: {
        ...operacaoResponse.delete,
      },
    },
  },
};

export default operacaoPaths;
