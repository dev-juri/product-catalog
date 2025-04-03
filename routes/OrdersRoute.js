var express = require("express");
var router = express.Router();
var orderController = require("../controllers/OrderController.js");

router.post("/", orderController.placeOrder);

router.get("/customer/:customerId", orderController.getCustomerOrders);

router.put("/", orderController.updateOrder);

module.exports = router;
