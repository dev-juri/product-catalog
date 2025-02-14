const Product = require("../models/ProductModel");

const addProduct = async (req, res, next) => {
  try {
    const { name, price, description, inventory, categories, currency } =
      req.body;

    const newProduct = new Product({
      name,
      price: price * 100,
      description,
      inventory,
      categories,
      currency,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({
      status: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const fetchProducts = async (req, res, next) => {
  try {
    const data = await Product.find();

    return res.json({ status: true, message: "Products retrieved", data });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const data = await Product.findById(productId);

    if (data) {
      res
        .status(200)
        .json({ status: true, message: "Product retrieved", data });
    } else {
      res.status(404).json({ status: false, error: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { _id, name, price, description, inventory, categories, currency } =
      req.body;

    if (!_id && (!name || !price || !description || !inventory || !categories || !currency)) {
      return res
        .status(400)
        .json({ status: false, error: "Bad request" });
    }

    const product = await Product.findById(_id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { $set: { name, price, description, inventory, categories, currency } },
      { new: true, runValidators: true }
    );

    res.json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ status: false, error: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getProductAvailability = async (productId) => {
    return await Product.findById(productId);
};

module.exports = {
  addProduct,
  fetchProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductAvailability,
};
