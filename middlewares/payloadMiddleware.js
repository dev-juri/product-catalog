const Ajv = require("ajv");
const addErrors = require("ajv-errors");
const registerUserSchema = require("../payloads/RegisterUserPayload");
const loginSchema = require("../payloads/LoginPayload");

const ajv = new Ajv({ allErrors: true, strict: false });
addErrors(ajv);

const validateRegistrationPayload = (req, res, next) => {
  const validate = ajv.compile(registerUserSchema);
  const valid = validate(req.body);

  if (!valid) {
    throw new Error(validate.errors[0].message, { status: 400 });
  }

  next();
};

const validateLoginPayload = (req, res, next) => {
  const validate = ajv.compile(loginSchema);
  const valid = validate(req.body);

  if (!valid) {
    throw new Error(validate.errors[0].message, { status: 400 });
  }

  next();
};

module.exports = { validateRegistrationPayload, validateLoginPayload };
