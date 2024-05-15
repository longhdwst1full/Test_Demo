// models/product.model.js
export default (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING
    },
     
    status: {
      type: Sequelize.STRING
    }
  });

  return Category;
};
