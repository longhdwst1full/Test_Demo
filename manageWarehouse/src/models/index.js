
import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
import productModel from "./product.model.js";
import purchaseOrderModel from "./purchaseOrder.model.js";
import salesOrderModel from "./salesOrder.model.js";
import roleModel from "./role.model.js";
import userModel from "./user.model.js";
import suplierModel from "./suplier.model.js";
import wareHouseModel from "./wareHouse.model.js";
import categoryModel from "./category.model.js";
import inventoryModel from "./inventory.model.js";


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = productModel(sequelize, Sequelize);
db.purchaseOrders = purchaseOrderModel(sequelize, Sequelize);
db.roles = roleModel(sequelize, Sequelize);
db.customers = userModel(sequelize, Sequelize);
db.wareHouses = wareHouseModel(sequelize, Sequelize);
db.suplier = suplierModel(sequelize, Sequelize);
db.categories = categoryModel(sequelize, Sequelize);
db.inventories = inventoryModel(sequelize, Sequelize);
db.salesOrders = salesOrderModel(sequelize, Sequelize); 

// Thiết lập các mối quan hệ
db.products.hasMany(db.purchaseOrders, { as: "orders" });
db.purchaseOrders.belongsTo(db.products, {
  foreignKey: "productId",
  as: "product"
});

db.products.hasMany(db.salesOrders, { as: "salesOrders" });
db.salesOrders.belongsTo(db.products, {
  foreignKey: "productId",
  as: "product"
});

db.categories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category"
});

export default db;