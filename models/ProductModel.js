const mongoose = require("mongoose");
const User = require("./UserModel");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Product name cannot be empty"],
    },
    variants: [
      {
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
        price: { type: Number, min: 0, required: true },
        stock: { type: Number, min: 0, required: true },
        currency: {
          type: String,
          enum: ["USD", "NGN", "KHS", "AUD", "CAD"],
          index: true,
          required: true,
        }
      },
    ],
    category: {
      type: String,
      required: true,
      index: true,
    },
    seller: {
      type: Schema.Types.ObjectId, ref: "User", required: true,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

const CategoryAnalysis = async () => {
  let pipeline = [
      {
        $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalProducts: 1
        }
      }
  ];
  return await Product.aggregate(pipeline);
};

const ProductAnalysis = async () => {
  let pipeline = [
    { $unwind: "$variants" },
    {
      $group: {
        _id: "$category",
        totalVariant: { $sum: 1 },
        averagePrice: { $avg: "$variants.price" },
        totalStock: { $sum: "$variants.stock" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalVariant: 1,
        averagePrice: 1,
        totalStock: 1,
      }
    }
  ];
  return await Product.aggregate(pipeline);
};


module.exports = { Product, CategoryAnalysis, ProductAnalysis };