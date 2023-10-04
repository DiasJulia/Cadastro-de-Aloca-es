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
      url: "http://localhost:3001",
      description: "Local Server",
    },
  ],
  paths: {
    ...operacaoPaths,
  },
  schemas: {
    ...operacaoSchemas,
  },
};
