

import db from "../models/index.js";
const Roles = db.roles;

export const create = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const product = await Roles.create({
      role_name, permissions
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Product." });
  }
};


export const updateRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const product = await Roles.update({
      role_name, permissions
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Product." });
  }
};

export const deletRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const product = await Roles.update({
      role_name, permissions
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Product." });
  }
};

export const findAll = async (req, res) => {
  try {
    const products = await Roles.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving products." });
  }
};
