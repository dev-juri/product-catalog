var express = require("express");
var router = express.Router();
var productController = require("../controllers/ProductController");

router.get("/", productController.fetchProducts);

router.get("/:productId", productController.getProduct);

router.post("/", productController.addProduct);

router.put("/", productController.updateProduct);

router.delete("/:productId", productController.deleteProduct);

module.exports = router;
