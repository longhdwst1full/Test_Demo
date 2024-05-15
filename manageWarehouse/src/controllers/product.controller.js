// controllers/product.controller.js
import db from "../models/index.js";
const Product = db.products;

export const create = async (req, res) => {
  try {
    const { name, description, price, unit, category_id, image_url, color, size } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      unit,
      category_id,
      image_url,
      color,
      size
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Product." });
  }
};

export const findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving products." });
  }
};
