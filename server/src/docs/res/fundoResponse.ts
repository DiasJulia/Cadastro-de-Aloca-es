const fundoResponse = {
  readByCNPJDate: {
    "200": {
      description: "Sucesso",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              cnpj: {
                type: "string",
                example: "00000000000000",
              },
              data: {
                type: "string",
                example: "2021-01-01",
              },
              valor: {
                type: "number",
                example: 1000,
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Erro",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Erro",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Erro",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Recurso não encontrado",
              },
            },
          },
        },
      },
    },
  },
};

export { fundoResponse };
