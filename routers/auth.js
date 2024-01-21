const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       required:
 *         - email
 *         - password
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User logged in
 */


router.post('/login', authController.userLogin)

/**
 * @openapi
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The email of the user
 *       required:
 *         - refreshToken
 */

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Get new access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Access Token received
 */

router.post('/refresh', authController.getNewAccessToken)

module.exports = router;
