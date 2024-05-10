const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const UserLoginModel = require('./models/User_Login')
const BlacklistTokenModel = require('./models/BlacklistToken')

const sequelize = new Sequelize("postgres://mkyong:password@localhost:8888/mydb"
  // dialectOptions: {
  //   "ssl": {
  //     "require":true,
  //     "rejectUnauthorized": false
  //   }
  // },
  // define: {
  //   timestamps: false
  // },

  // pool: {
  //     max: 20,
  //     min: 0,
  //     idle: 5000
  // },
  // logging:false
);

const User = UserModel(sequelize, Sequelize);
const User_Login = UserLoginModel(sequelize, Sequelize);
const BlacklistToken = BlacklistTokenModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('db and tables have been created');
});

module.exports = {User, User_Login, BlacklistToken};
