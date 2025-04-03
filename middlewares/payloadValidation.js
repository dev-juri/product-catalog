const Ajv = require("ajv");
const addErrors = require("ajv-errors");
const refreshSchema = require("../payloads/RefreshTokenPayload.js");
const loginSchema = require("../payloads/LoginPayload.js");
const registerSchema = require("../payloads/RegisterUserPayload.js");
const updateUserSchema = require("../payloads/UpdateUserPayload.js");

const ajv = new Ajv({ allErrors: true, strict: false });
addErrors(ajv);

const createValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
      return res
        .status(400)
        .json({ status: false, error: validate.errors[0].message });
    }

    next();
  };
};

const validateRegistrationPayload = createValidationMiddleware(registerSchema);
const validateLoginPayload = createValidationMiddleware(loginSchema);
const validateRefreshPayload = createValidationMiddleware(refreshSchema);
const validateUpdatePayload = createValidationMiddleware(updateUserSchema);

module.exports = {validateRegistrationPayload, validateLoginPayload, validateRefreshPayload, validateUpdatePayload}