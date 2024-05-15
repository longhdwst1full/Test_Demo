export default (sequelize, Sequelize) => {
  const roles = sequelize.define("role", {
    role_name: {
      type: Sequelize.STRING
    },
    permissions: {
      type: Sequelize.STRING
    },

  });

  return roles;
};