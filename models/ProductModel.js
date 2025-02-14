const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    description: { type: String, required: true },
    inventory: { type: Number, min: 0, required: true },
    categories: { type: [String], index: true, required: true },
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
