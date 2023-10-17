import { fundoResponse } from "../res/fundoResponse";

const fundoPaths = {
  "/fundo?cnpj={cnpj}&data={data}": {
    get: {
      tags: ["Fundo"],
      summary: "Retorna o valor da cota de um fundo em um dia específico.",
      parameters: [
        {
          name: "cnpj",
          in: "path",
          description: "CNPJ do fundo",
          required: true,
          schema: {
            type: "string",
            example: "00.017.024/0001-53",
          },
        },
        {
          name: "data",
          in: "path",
          description: "Data da cota",
          required: true,
          schema: {
            type: "string",
            example: "2022-10-14",
          },
        },
      ],
      responses: {
        ...fundoResponse.readByCNPJDate,
      },
    },
  },
};

export default fundoPaths;
