// utils/authorization.js
const jwt = require("jsonwebtoken");
const logger = require("./logger.js");

// Định nghĩa menu và quyền truy cập
const menu = {
  dashboard: {
    name: "Dashboard",
    permissions: ["admin", "manager", "user"],
    component: "Dashboard",
  },
  users: {
    name: "Users",
    permissions: ["admin"],
    component: "Users",
  },
  products: {
    name: "Products",
    permissions: ["admin", "manager"],
    component: "Products",
  },
  profile: {
    name: "Profile",
    permissions: ["admin", "manager", "user"],
    component: "Profile",
  },
};

// Định nghĩa các API và quyền truy cập
const apiPermissions = {
  "/api/users": ["admin", "user"],
  "/api/products": ["admin", "manager"],
  "/api/profile": ["admin", "manager", "user"],
};

const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const tokenHeader = req.headers.authorization.split(" ")[1];
    // Giải mã token JWT để lấy thông tin người dùng
    const decoded = jwt.verify(tokenHeader, "kgyui9");

    const { role } = decoded;
    console.log(req.path, ":::: path");
    // Kiểm tra quyền truy cập API
    // get path endpoint
    const apiPath = req.path;

    const apiPermission = apiPermissions[apiPath];
    logger.info(`path: ${apiPath} ==== decode=${JSON.stringify(decoded)}`);
    //check role has into list role access
    if (apiPermission && !apiPermission.includes(role)) {
      console.log("check role");
      logger.error(JSON.stringify({ error: "Forbidden" }));
      return res.status(403).json({ error: "Forbidden" });
    }

    // Lọc menu dựa trên quyền truy cập của người dùng
    const filteredMenu = Object.entries(menu).reduce((acc, [key, value]) => {
      console.log(acc, key, value, "dddd");
      if (value.permissions.includes(role)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    logger.info(`menu: ${JSON.stringify(filteredMenu)}`);
    req.user = decoded;
    req.menu = filteredMenu;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authorize, menu };
