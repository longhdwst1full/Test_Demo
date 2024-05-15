// models/Inventory.model.js
export default (sequelize, Sequelize) => {
  const Inventory = sequelize.define("inventory", {

    quantity: {
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    warehouse_id: {
      type: Sequelize.INTEGER
    },

  });

  return Inventory;
};
