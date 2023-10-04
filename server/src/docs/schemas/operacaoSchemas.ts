const operacaoSchemas = {
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
  required: ["CNPJ", "data", "valor", "tipo"],
};

export default operacaoSchemas;
