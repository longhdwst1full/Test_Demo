// controllers/salesOrder.controller.js
import SalesOrder from "../models/salesOrder.model.js";

/***
 * create a new sales order
 * body:
 * user_id, order_date, status
 */
export const create = async (req, res) => {
  try {
    const { user_id, order_date, status } = req.body;

    const salesOrder = await SalesOrder.create({
      user_id,
      order_date,
      status,
    });

    res.status(201).json(salesOrder);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Sales Order.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find();
    res.status(200).json(salesOrders);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving sales orders.",
    });
  }
};

/***
 * create a new sales order
 * param : id - id of the sales order
 * body:
 * user_id, order_date, status
 */
export const updateSaleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, order_date, status } = req.body;

    const salesOrder = await SalesOrder.findByIdAndUpdate(id, {
      user_id,
      order_date,
      status,
    });

    res.status(201).json(salesOrder);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Sales Order.",
    });
  }
};

export const deleteSaleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await SalesOrder.findByIdAndDelete(id);

    res.status(200).json("Delete success");
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Sales Order.",
    });
  }
};
