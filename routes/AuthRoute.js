var express = require("express");
var router = express.Router();
const { loginUser, refreshToken } = require("../controllers/AuthController.js");
const {
  validateLoginPayload,
  validateRefreshPayload
} = require("../middlewares/payloadValidation.js");

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns an access token and refresh token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User successfully logged in"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: The access token for authentication.
 *                     refreshToken:
 *                       type: string
 *                       description: The refresh token for obtaining a new access token.
 *       400:
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
 */
router.post("/", validateLoginPayload, loginUser);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenPayload'
 *     responses:
 *       200:
 *         description: New accessToken generated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       400:
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
 */
router.post("/refresh-token", validateRefreshPayload, refreshToken);

module.exports = router;
