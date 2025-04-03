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
 *             $ref: '#/components/schemas/RegisterUserPayload'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralSuccessResponse'
 *       400:
 *         description: Bad request - Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
 *       409:
 *         description: Conflict - Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
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
 *             $ref: '#/components/schemas/UpdateUserPayload'
 *     responses:
 *       200:
 *         description: User account updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralSuccessResponse'
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralErrorResponse'
 */
router.delete("/delete", isAuthenticatedUser, deleteUser);

module.exports = router;
