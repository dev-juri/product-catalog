var Order = require("../models/OrderModel");
var productController = require("../controllers/ProductController");

const placeOrder = async (req, res, next) => {
  try {
    const { productId, quantity, customerId } = req.body;
    var product = productController.getProductAvailability(productId);
    if (!product) {
      return res
        .status(400)
        .json({ status: false, error: "Product not found" });
    }

    var newOrder = new Order({ productId, quantity });
    newOrder.price = product.price;

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

const getProductOrders = async (req, res, next) => {
  try {
    const { productId } = req.params;

    var product = productController.getProductAvailability(productId);
    if (!product) {
      return res
        .status(400)
        .json({ status: false, error: "Product not found" });
    }

    var data = await Order.find({ productId });
    return res
      .status(200)
      .json({ status: true, message: "Product's orders retrived", data });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { _id, quantity, price, status } = req.body;

    if (!_id && (!quantity || !price || !status)) {
      return res.status(400).json({ status: false, error: "Bad Request" });
    }

    const _order = await Order.findById(_id);
    if (!_order) {
      return res.status(404).json({ status: false, error: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { $set: { quantity, price, status } },
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
  getProductOrders,
  updateOrder,
};
