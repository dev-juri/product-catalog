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
      schemas: {
        LoginPayload: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "john@doe.com",
              description: "User's email address",
            },
            password: {
              type: "string",
            example: "@Strongpassword123",
              description: "User's password",
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: "false",
            },
            error: {
              type: "string",
              example: "Description of the error",
              description: "The error message"
            },
          },
        },
      },
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
