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
