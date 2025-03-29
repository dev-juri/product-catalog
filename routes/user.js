var express = require("express");
var router = express.Router();
const { registerUser } = require("../controllers/UserController");
const { validateRegistrationPayload } = require("../middlewares/payloadMiddleware");

router.post("/register", validateRegistrationPayload, registerUser);

module.exports = router;
