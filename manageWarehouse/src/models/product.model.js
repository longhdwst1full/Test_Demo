// models/product.model.js
export default (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    unit: {
      type: Sequelize.STRING
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    image_url: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    }
  });

  return Product;
};
