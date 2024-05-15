// controllers/purchaseOrder.controller.js
import db from "../models/index.js";
const PurchaseOrder = db.purchaseOrders;

export const create = async (req, res) => {
  try {
    const { supplier_id, order_date, status } = req.body;

    const purchaseOrder = await PurchaseOrder.create({
      supplier_id,
      order_date,
      status
    });

    res.status(201).json(purchaseOrder);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the Purchase Order." });
  }
};

export const findAll = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll();
    res.status(200).json(purchaseOrders);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving purchase orders." });
  }
};
