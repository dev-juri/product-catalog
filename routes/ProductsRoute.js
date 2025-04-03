var express = require("express");
var router = express.Router();
var productController = require("../controllers/ProductController.js");
const { isAuthenticatedUser } = require("../middlewares/AuthenticationMiddleware.js");

router.get('/product-analysis', productController.productStats);

router.get('/category-analysis', productController.categoryStats)

router.get("/", productController.fetchProducts);

router.get("/:productId", productController.getProduct);

router.post("/", isAuthenticatedUser, productController.addProduct);

router.put("/", isAuthenticatedUser, productController.updateProduct);

router.delete("/:productId", isAuthenticatedUser, productController.deleteProduct);

module.exports = router;
