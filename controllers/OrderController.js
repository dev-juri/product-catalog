var Order = require("../models/OrderModel");

const placeOrder = async (req, res, next) => {
  try {
    const { products, totalAmount, customerId } = req.body;

    var newOrder = new Order({ products, totalAmount, customerId });

    if (customerId) {
      newOrder.customerId = customerId;
    }

    const savedOrder = await newOrder.save();
    return res.status(201).json({
      status: true,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerOrders = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    var data = await Order.find({ customerId });
    return res
      .status(200)
      .json({ status: true, message: "Customer's orders retrived", data });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { _id, products, totalAmount, status } = req.body;

    if (!_id && (!products || !totalAmount || !status)) {
      return res.status(400).json({ status: false, error: "Bad Request" });
    }

    const _order = await Order.findById(_id);
    if (!_order) {
      return res.status(404).json({ status: false, error: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { $set: { products, totalAmount, status } },
      { new: true, runValidators: true }
    );

    res.json({
      status: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getCustomerOrders,
  updateOrder,
};
