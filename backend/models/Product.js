const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
