var express = require("express");
var router = express.Router();
var reviewController = require("../controllers/ReviewController")

router.post('/', reviewController.addReview)

router.get('/:reviewId', reviewController.getReview)

router.get('/product/:productId', reviewController.getProductReviews)

router.get('/customer/:customerId', reviewController.getCustomerReviews)

router.put('/', reviewController.updateReview)

router.delete('/:reviewId', reviewController.deleteReview)

module.exports = router