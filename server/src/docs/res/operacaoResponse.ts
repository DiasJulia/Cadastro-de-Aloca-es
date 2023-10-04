const operacaoResponse = {
  create: {
    201: {
      description: "Operação criada com sucesso",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Operação criada com sucesso",
        },
        operacao: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            CNPJ: {
              type: "string",
              example: "12345678901234",
            },
            data: {
              type: "string",
              example: "2021-01-01",
            },
            valor: {
              type: "number",
              example: 1000.0,
            },
            tipo: {
              type: "string",
              example: "Compra",
            },
          },
        },
      },
    },
    400: {
      description: "Parâmetros inválidos",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Parâmetros inválidos",
        },
        error: {
          type: "string",
          example: "Parâmetros inválidos",
        },
      },
    },
    500: {
      description: "Erro na requisição",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Erro na requisição",
        },
        error: {
          type: "string",
          example: "Erro na requisição",
        },
      },
    },
  },
  readAll: {
    200: {
      description: "Informações de todas as operações encontradas",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Informações de todas as operações encontradas",
        },
        operacoes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              CNPJ: {
                type: "string",
                example: "12345678901234",
              },
              data: {
                type: "string",
                example: "2021-01-01",
              },
              valor: {
                type: "number",
                example: 1000.0,
              },
              tipo: {
                type: "string",
                example: "Compra",
              },
            },
          },
        },
      },
    },
    404: {
      description: "Operação não encontrada",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Operação não encontrada",
        },
        error: {
          type: "string",
          example: "Operação não encontrada",
        },
      },
    },
    500: {
      description: "Erro na requisição",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Erro na requisição",
        },
        error: {
          type: "string",
          example: "Erro na requisição",
        },
      },
    },
  },
};

export { operacaoResponse };
