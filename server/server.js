// menu/server.js
const express = require("express");
const logger = require("./utils/logger.js");
const errorHandler = require("./utils/errorHandler.js");
const { authorize } = require("./utils/authorization.js");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

app.use(express.json());
// Cấu hình quyền truy cập cho các API

app.use("/login", async (req, res) => {
  try {
    const token = jwt.sign(
      { username: req.body.username, role: req.body.role },
      "kgyui9",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi server!",
    });
  }
});

app.get("/api/users", authorize, (req, res) => {
  return res.json({ user: "user", menu: req.menu, role: req.user });
});
app.get("/api/products", authorize, (req, res) => {
  // console.log(req.user);
  return res.json({ prodcuct: "prodcuct", menu: req.menu, role: req.user });
});
app.get("/api/profile", authorize, (req, res) => {
  console.log(req);
  return res.json({ profile: "profile" });
});

// Trả về menu đã được phân quyền
app.get("/menu", authorize, (req, res) => {
  res.status(200).json(req.menu);
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Menu server running on port ${port}`);
});
