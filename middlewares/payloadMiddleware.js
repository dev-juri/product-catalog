const Ajv = require("ajv");
const addErrors = require("ajv-errors");
const refreshSchema = require("../payloads/RefreshTokenPayload");
const loginSchema = require("../payloads/LoginPayload");
const registerSchema = require("../payloads/RegisterUserPayload");

const ajv = new Ajv({ allErrors: true, strict: false });
addErrors(ajv);

const createValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
      return res.status(400).json({ status: false, error: validate.errors[0].message });
    }

    next();
  };
};

exports.validateRegistrationPayload =
  createValidationMiddleware(registerSchema);
exports.validateLoginPayload = createValidationMiddleware(loginSchema);
exports.validateRefreshPayload = createValidationMiddleware(refreshSchema);
