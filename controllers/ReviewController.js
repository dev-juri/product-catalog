var Review = require("../models/ReviewModel");
var productController = require("../controllers/ProductController");

const addReview = async (req, res, next) => {
  try {
    const { productId, review, rating, customerId } = req.body;

    var product = productController.getProductAvailability(productId);
    if (!product) {
      return res
        .status(400)
        .json({ status: false, error: "Product not found" });
    }

    var newReview = new Review({ productId, review, rating });

    if(customerId) {
        newReview.customerId = customerId
    }

    const savedReview = await newReview.save();
    return res.status(201).json({
      status: true,
      message: "Review added successfully",
      data: savedReview,
    });
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    var data = await Review.findById(reviewId);
    if (data) {
      return res
        .status(200)
        .json({ status: true, message: "Review retrieved", data });
    } else {
      res.status(404).json({ status: false, error: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    var product = productController.getProductAvailability(productId);
    if (!product) {
      return res
        .status(400)
        .json({ status: false, error: "Product not found" });
    }

    var data = await Review.find({ productId });
    return res
      .status(200)
      .json({ status: true, message: "Product's reviews retrived", data });
  } catch (error) {
    next(error);
  }
};

const getCustomerReviews = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    var data = await Review.find({ customerId });
    return res
      .status(200)
      .json({ status: true, message: "Customer's reviews retrived", data });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { _id, review, rating } = req.body;

    if (!_id && (!review || !rating)) {
        return res
          .status(400)
          .json({ status: false, error: "Bad Request" });
      }

      const _review = await Review.findById(_id);
      if (!_review) {
        return res
          .status(404)
          .json({ status: false, error: "Review not found" });
      }
  
      const updatedReview = await Review.findByIdAndUpdate(
        _id,
        { $set: { review, rating } },
        { new: true, runValidators: true }
      );
  
      res.json({
        status: true,
        message: "Review updated successfully",
        data: updatedReview,
      });

  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res
        .status(400)
        .json({ status: false, error: "Review ID is required" });
    }

    const review = await Review.findById(reviewId);

    if (!reviewId) {
      return res
        .status(404)
        .json({ status: false, error: "Review not found" });
    }

    await Review.findByIdAndDelete(reviewId);

    res
      .status(200)
      .json({ status: true, message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  updateReview,
  getProductReviews,
  getCustomerReviews,
  deleteReview,
  getReview,
};
