var express = require("express");
var router = express.Router();
const { registerUser, updateUserDetails, deleteUser } = require("../controllers/UserController.js");
const {
  validateRegistrationPayload,
  validateUpdatePayload
} = require("../middlewares/payloadValidation.js");
const { isAuthenticatedUser } = require("../middlewares/bearerAuthentication.js");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password, must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
 *                 example: "@Strongpassword123"
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User successfully registered
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
 *                   example: "User successfully registered"
 *       400:
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", validateRegistrationPayload, registerUser);

/**
 * @swagger
 * /users/update:
 *   patch:
 *     summary: Update user
 *     description: Update an existing user's details
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: User account updated successfully
 */
router.patch("/update", [validateUpdatePayload, isAuthenticatedUser], updateUserDetails);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete user account
 *     description: Deletes the authenticated user's account.
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/delete", isAuthenticatedUser, deleteUser);

module.exports = router;
