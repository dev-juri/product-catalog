const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const reviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, index: true },
    review: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return value.trim().length > 0;
        },
        message: "Review cannot be empty",
      },
    },
    rating: { type: Number, min: 0, max: 5, required: true },
    customerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      index: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
