export default (sequelize, Sequelize) => {
  const Suplier = sequelize.define("suplier", {
   
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contact_info: {
      type: Sequelize.STRING
    }
  });

  return Suplier;
};