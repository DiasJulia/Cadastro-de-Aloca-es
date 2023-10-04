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
};

export default operacaoPaths;
