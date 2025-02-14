const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const reviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, index: true },
  review: { type: String },
  rating: { type: Number, min: 0, index: true },
  customerId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    index: true
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
