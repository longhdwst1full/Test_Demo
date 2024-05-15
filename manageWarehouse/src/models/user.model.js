export default (sequelize, Sequelize) => {
  const customers = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    phone:{
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return customers;
};