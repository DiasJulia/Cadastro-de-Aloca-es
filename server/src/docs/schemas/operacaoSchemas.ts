const operacaoSchemas = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    CNPJ: {
      type: "string",
    },
    razao_social: {
      type: "string",
    },
    data: {
      type: "string",
    },
    valor: {
      type: "number",
    },
    quantidade: {
      type: "integer",
    },
    tipo: {
      type: "string",
    },
  },
  required: ["CNPJ", "razao_social", "data", "valor", "quantidade", "tipo"],
};

export default operacaoSchemas;
