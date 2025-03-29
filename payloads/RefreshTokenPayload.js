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
      refreshToken: "Refresh token must be a non-empty string.",
    },
    required: {
      refreshToken: "Refresh token is required.",
    },
    additionalProperties: "Extra properties are not allowed.",
  },
};

module.exports = refreshSchema;