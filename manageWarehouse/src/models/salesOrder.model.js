// models/salesOrder.model.js
export default (sequelize, Sequelize) => {
  const SalesOrder = sequelize.define("salesOrder", {
    customer_id: {
      type: Sequelize.INTEGER
    },
    order_date: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return SalesOrder;
};
