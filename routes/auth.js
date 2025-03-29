var express = require("express");
var router = express.Router();
const { loginUser } = require("../controllers/AuthController");
const { validateLoginPayload } = require("../middlewares/payloadMiddleware");

router.post('/', validateLoginPayload, loginUser)

module.exports = router;