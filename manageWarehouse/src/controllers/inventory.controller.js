import Inventory from "../models/inventory.model.js";

/***
 * body:  
 *    quantity,
      product_id
      warehouse_id
  parameters : id
 */
export const createInvertory = async (req, res) => {
  try {
    const { quantity, product_id, warehouse_id } = req.body;

    const inventory = await Inventory.create({
      quantity,
      product_id,
      warehouse_id,
    });

    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Inventory.",
    });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, product_id, warehouse_id } = req.body;

    const inventory = await Inventory.findByIdAndUpdate(
      { _id: id },
      {
        quantity,
        product_id,
        warehouse_id,
      }
    );

    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Inventory.",
    });
  }
};

export const deletInvertory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Inventory.",
    });
  }
};

export const findAllInvertory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving Inventory.",
    });
  }
};
