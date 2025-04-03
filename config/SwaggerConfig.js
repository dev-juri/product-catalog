const swaggerJSDoc = require("swagger-jsdoc");
const { properties } = require("../payloads/RefreshTokenPayload");

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
        GeneralErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: "false",
            },
            error: {
              type: "string",
              example: "Description of the error",
              description: "The error message",
            },
          },
        },
        GeneralSuccessResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: "true",
            },
            message: {
              type: "string",
              example: "Description of the success",
              description: "The success message",
            },
          },
        },
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
            },
          },
        },
        RefreshTokenPayload: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: {
              type: "refreshToken",
              example: "string",
              description: "User's refresh token",
            },
          },
        },
        RefreshTokenResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: "true",
            },
            message: {
              type: "string",
              example: "Access token generated successfully",
            },
            data: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "string",
                },
              },
            },
          },
        },
        RegisterUserPayload: {
          type: "object",
          required: ["email", "password", "fullName"],
          properties: {
            email: {
              type: "string",
              example: "john@doe.com",
              description: "User's email address",
            },
            fullName: {
              type: "string",
              example: "John Doe",
              description: "User's full name",
            },
            password: {
              type: "string",
              example: "@Strongpassword123",
              description:
                "Password must be at least 8 characters, including uppercase, lowercase, a number, and a special character.",
            },
          },
        },
        UpdateUserPayload: {
          type: "object",
          required: ["fullName"],
          properties: {
            fullName: {
              type: "string",
              example: "John Doe",
              description: "User's full name",
            },
          },
        },
        UpdateUserResponse: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User's ID",
              example: "648c2e8b8f1a4b3e4f5d6e7f",
            },
            fullName: {
              type: "string",
              example: "John Doe",
              description: "User's full name",
            },
            email: {
              type: "email",
              example: "john@doe.com",
              description: "User's email",
            },
            createdAt: {
              type: "date",
              example: "2023-10-01T12:00:00Z",
              description: "Date when the user was created",
            },
            updatedAt: {
              type: "date",
              example: "2023-10-01T12:00:00Z",
              description: "Date when the user was updated",
            },
            deletedAt: {
              type: "date",
              example: "null",
              description: "Date when the user was deleted",
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
        url: process.env.SERVER_URL,
      },
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
