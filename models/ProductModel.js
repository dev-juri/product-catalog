const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Product name cannot be empty"],
    },
    price: { type: Number, min: 0, required: true },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.trim().length > 0;
        },
        message: "Description cannot be empty",
      },
    },
    inventory: { type: Number, min: 0, required: true },
    categories: {
      type: [String],
      required: [true, "At least one category is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one category is required",
      },
      index: true,
    },
    currency: {
      type: String,
      enum: ["USD", "NGN", "KHS", "AUD", "CAD"],
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
