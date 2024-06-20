import Roles from "../models/role.model.js";

/***
 * body:  
 *    role_name,
      permissions
  parameters : id
 */
export const create = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;

    const product = await Roles.create({
      role_name,
      permissions,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, permissions } = req.body;
    console.log(id, role_name, permissions, ":ddata");
    const product = await Roles.findByIdAndUpdate(
      { _id: id },
      {
        role_name,
        permissions,
      }
    );

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const deletRole = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Roles.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const products = await Roles.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving products.",
    });
  }
};
