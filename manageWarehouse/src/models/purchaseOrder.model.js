// models/purchaseOrder.model.js
export default (sequelize, Sequelize) => {
  const PurchaseOrder = sequelize.define("order", {
    supplier_id: {
      type: Sequelize.INTEGER
    },
    order_date: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return PurchaseOrder;
};
