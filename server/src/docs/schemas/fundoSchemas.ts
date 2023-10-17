const fundoSchemas = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    CNPJ: {
      type: "string",
    },
    data: {
      type: "string",
    },
    valor: {
      type: "number",
    },
  },
  required: ["CNPJ", "data", "valor"],
};

export default fundoSchemas;
