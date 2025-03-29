const registerUserSchema = {
    type: "object",
    properties: {
      email: {
        type: "string",
        pattern:
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          errorMessage: "Email must be a valid email address (e.g., user@example.com).",
      },
      fullName: { 
        type: "string", 
        minLength: 1,
        errorMessage: "Full name must not be empty."
      },
      password: { 
        type: "string", 
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$",
        errorMessage:
        "Password must be at least 8 characters, including uppercase, lowercase, a number, and a special character.",
      },
    },
    required: ["email", "fullName", "password"],
    additionalProperties: false,
    errorMessage: {
      properties: {
        email: "Email must be a non-empty string.",
        fullName: "Full name must be non-empty.",
        password: "Password must be a non-empty string.",
      },
      required: {
        email: "Email is required.",
        fullName: "Full name is required.",
        password: "Password is required.",
      },
      additionalProperties: "Invalid field detected.",
    },
  };  

module.exports = registerUserSchema;