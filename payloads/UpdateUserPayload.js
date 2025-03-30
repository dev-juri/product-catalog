const updateUserSchema= {
    type: "object",
    properties: {
        fullName: { 
            type: "string", 
            minLength: 1,
            errorMessage: "Full name must not be empty."
          }
    },
    required: ["fullName"],
    additionalProperties: false,
    errorMessage: {
      properties: {
        fullName: "Full name must be a non-empty string.",
      },
      required: {
        fullName: "Full name is required.",
      },
      additionalProperties: "Invalid field detected.",
    },
}

module.exports = updateUserSchema;