const mongoose = require("mongoose");
const { Product } = require("./ProductModel");
const User = require("./UserModel");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: Product,
      required: true,
      index: true,
    },
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
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("init", function (doc) {
  delete doc.__v;
});


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
