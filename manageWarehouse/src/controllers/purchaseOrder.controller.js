// controllers/purchaseOrder.controller.js
import PurchaseOrder from "../models/purchaseOrder.model.js";
import WareHouse from "../models/wareHouse.model.js";

export const create = async (req, res) => {
  try {
    const { title, supplier_id, warehouse_id, user_receiver, products } =
      req.body;

    // Kiểm tra xem có tồn tại kho không
    const wareHouse = await WareHouse.findOne({ _id: warehouse_id });

    if (!wareHouse) {
      return res.status(404).json({ message: "Không tìm thấy kho này" });
    }

    // Kiểm tra và cập nhật mặt hàng trong kho
    const updatedItems = [...wareHouse.items];
    const dataAddWare = [];

    products.forEach((product) => {
      const existingProductIndex = updatedItems.findIndex(
        (item) => item.product_id.toString() === product.product_id
      );

      if (existingProductIndex !== -1) {
        // Trong kho đã có mặt hàng này, tăng số lượng
        updatedItems[existingProductIndex].quantity += product.quantity;
      } else {
        // Thêm mặt hàng mới vào kho
        dataAddWare.push({
          product_id: product.product_id,
          quantity: product.quantity,
        });
      }
    });

    // Nếu có sản phẩm mới, thêm chúng vào danh sách hàng trong kho
    if (dataAddWare.length > 0) {
      wareHouse.items = [...updatedItems, ...dataAddWare];
    } else {
      wareHouse.items = updatedItems;
    }

    // Lưu các thay đổi trong kho
    await wareHouse.save();

    // Tạo đơn đặt hàng
    const purchaseOrder = await PurchaseOrder.create({
      supplier_id,
      title,
      warehouse_id,
      user_receiver,
      products,
    });

    res.status(201).json({ message: "Cập nhật kho thành công", purchaseOrder });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Có lỗi xảy ra khi tạo đơn đặt hàng.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find()
      .populate("supplier_id")
      .populate("user_receiver")
      .populate("warehouse_id")
      .populate("products.product_id");
    res.status(200).json(purchaseOrders);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving purchase orders.",
    });
  }
};
