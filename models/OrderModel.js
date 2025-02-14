const mongoose = require("mongoose");

const { Types, Schema } = mongoose;

const orderSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, index: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, min: 0 },
    customerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      index: true,
    },
    status: {
      type: String,
      enum: ["fulfilled", "pending", "not_paid"],
      default: () => "not_paid",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
