var express = require("express");
var router = express.Router();
var orderController = require("../controllers/OrderController");

router.post("/", orderController.placeOrder);

router.get("/customer/:customerId", orderController.getCustomerOrders);

router.get("/product/:productId", orderController.getProductOrders);

router.put("/", orderController.updateOrder);

module.exports = router;
