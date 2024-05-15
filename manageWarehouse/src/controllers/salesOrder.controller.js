// controllers/salesOrder.controller.js
import db from "../models/index.js";
const SalesOrder = db.salesOrders;

export const create = async (req, res) => {
  try {
    const { customer_id, order_date, status } = req.body;

    const salesOrder = await SalesOrder.create({
      customer_id,
      order_date,
      status
    });

    res.status(201).json(salesOrder);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Sales Order." });
  }
};

export const findAll = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.findAll();
    res.status(200).json(salesOrders);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving sales orders." });
  }
};
