const subscriptionController = require("../controllers/subscription");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/IsAdmin");
const router = express.Router();

/**
 * @openapi
 * /subscription:
 *   get:
 *     tags:
 *       - Subscription
 *     description: Returns list of available subscriptions
 *     responses:
 *       200:
 *         description: List of subscriptions is returned
 */

router.get("/", subscriptionController.listSubscriptions); // List subscriptions

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the subscription
 *         price:
 *           type: number
 *           description: The price of the subscription
 *         durationInDays:
 *           type: number
 *           description: The duration of the subscription in days
 *         firstTimeUserDiscount:
 *           type: number
 *           description: The discount for first-time users (optional)
 *         currency:
 *           type: string
 *           description: The currency of the subscription
 *         dateAdded:
 *           type: string
 *           format: date-time
 *           description: The date when the subscription was added
 *       required:
 *         - name
 *         - price
 *         - durationInDays
 *         - currency
 */

/**
 * @openapi
 * /subscription:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Admin create subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription Created
 */
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  subscriptionController.createSubscription
); // Create subscription

/**
 * @openapi
 * /subscription/{id}:
 *   get:
 *     tags:
 *       - Subscription
 *     description: Returns details of a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to retrieve
 *     responses:
 *       200:
 *         description: Subscription detail is returned
 */
router.get(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.subscriptionDetail
); // Retrieve subscription

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the subscription
 *         price:
 *           type: number
 *           description: The price of the subscription
 *         durationInDays:
 *           type: number
 *           description: The duration of the subscription in days
 *         firstTimeUserDiscount:
 *           type: number
 *           description: The discount for first-time users (optional)
 *         currency:
 *           type: string
 *           description: The currency of the subscription
 *         dateAdded:
 *           type: string
 *           format: date-time
 *           description: The date when the subscription was added
 *       required:
 *         - name
 *         - price
 *         - durationInDays
 *         - currency
 */

/**
 * @openapi
 * /subscription/{id}:
 *   patch:
 *     tags:
 *       - Subscription
 *     description: Updates Subscription based on ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to update
 *     responses:
 *       200:
 *         description: Subscription updated
 */
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.updateSubscription
); // Update subscription

/**
 * @openapi
 * /subscription/{id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     description: Subscription Deletion
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscription to delete
 *     responses:
 *       204:
 *         description: Subscription is deleted
 */
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.deleteSubscription
); // Delete subscription

module.exports = router;
