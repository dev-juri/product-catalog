const refreshSchema = {
  type: "object",
  properties: {
    refreshToken: {
      type: "string"
    },
  },
  required: ["refreshToken"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      refreshToken: "Access token must be a non-empty string.",
    },
    required: {
      refreshToken: "Access token is required.",
    },
    additionalProperties: "Extra properties are not allowed.",
  },
};

module.exports = refreshSchema;