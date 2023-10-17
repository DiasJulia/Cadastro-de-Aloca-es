import fundoPaths from "./routes/fudoPaths";
import fundoSchemas from "./schemas/fundoSchemas";
import operacaoPaths from "./routes/operacaoPaths";
import operacaoSchemas from "./schemas/operacaoSchemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "API",
    description: "API para Registros de Operações",
    version: "0.0.1",
  },
  servers: [
    {
      url: process.env.SERVER_HOST_INTERNAL || "http://localhost:3001/api",
      description: "Local Server",
    },
  ],
  paths: {
    ...operacaoPaths,
    ...fundoPaths,
  },
  components: {
    schemas: {
      operacao: operacaoSchemas,
      fundo: fundoSchemas,
    },
  },
};
