// menu/server.js
const express = require("express");
const logger = require("../utils/logger.js");
const errorHandler = require("../utils/errorHandler.js");
const { authorize } = require("../utils/authorization.js");

const app = express();
const port = 3001;

app.use(express.json());

// Trả về menu đã được phân quyền
app.get("/menu", authorize, (req, res) => {
  res.status(200).json(req.menu);
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Menu server running on port ${port}`);
});
