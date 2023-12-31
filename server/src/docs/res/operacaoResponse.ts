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
  readAllGroupedByCNPJ: {
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
              CNPJ: {
                type: "string",
                example: "12345678901234",
              },
              razao_social: {
                type: "string",
                example: "Empresa 1",
              },
              preco_total: {
                type: "number",
                example: 1000.0,
              },
              quantidade_total: {
                type: "integer",
                example: 10,
              },
              valor_unitario_atual: {
                type: "number",
                example: 1.2,
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
  update: {
    200: {
      description: "Operação atualizada com sucesso",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Operação atualizada com sucesso",
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
  delete: {
    200: {
      description: "Operação deletada com sucesso",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Operação deletada com sucesso",
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
