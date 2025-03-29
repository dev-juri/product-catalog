const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern:
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "Email must be a valid email address (e.g., user@example.com).",
    },
    password: {
      type: "string",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$",
        errorMessage:
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = loginSchema;
