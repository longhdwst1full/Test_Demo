// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/product.routes.js";
import purchaseOrderRoutes from "./routes/purchaseOrder.routes.js";
import salesOrderRoutes from "./routes/salesOrder.routes.js";
import db from "./models/index.js";
import roleRoutes from "./routes/role.routes.js";

dotenv.config();

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối cơ sở dữ liệu
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch(err => {
    console.log("Failed to sync db: " + err.message);
  });

// Định tuyến
productRoutes(app);
purchaseOrderRoutes(app);
salesOrderRoutes(app);
roleRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
