const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "Product Catalog API",
      description: "API documentation for the Product Catalog application",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          bearerFormat: "JWT",
          scheme: "bearer",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
