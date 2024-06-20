// controllers/product.controller.js
import Category from "../models/category.model.js";

/***
 * body:
 *  nameCate, status
 * parameters : id
 */
export const create = async (req, res) => {
  try {
    const { status, nameCate } = req.body;

    const product = await Category.create({
      status,
      nameCate,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const findAllCate = async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving categorys.",
    });
  }
};

export const updateCate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, nameCate } = req.body;
    console.log(id, status, nameCate, ":ddata");
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      {
        status,
        nameCate,
      }
    );

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const deletCate = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the category.",
    });
  }
};
