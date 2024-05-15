// models/purchaseOrder.model.js
export default (sequelize, Sequelize) => {
  const wareHouses = sequelize.define("wareHouse", {
    location: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return wareHouses;
};
