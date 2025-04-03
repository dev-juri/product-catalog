const mongoose = require("mongoose");
const { Product } = require("./ProductModel.js");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productDetails: [
      {
        product: { type: Schema.Types.ObjectId, ref: Product, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["fulfilled", "pending", "not_paid"],
      default: "not_paid",
    },
  },
  { timestamps: true }
);

orderSchema.pre("init", function (doc) {
  delete doc.__v;
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
