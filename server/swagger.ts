import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/*.ts"], // Altere este caminho para corresponder às suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
