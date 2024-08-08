// utils/authorization.js
const jwt = require('jsonwebtoken');
const logger = require('./logger');

// Định nghĩa menu và quyền truy cập
const menu = {
  dashboard: {
    name: 'Dashboard',
    permissions: ['admin', 'manager', 'user'],
    component: 'Dashboard'
  },
  users: {
    name: 'Users',
    permissions: ['admin'],
    component: 'Users'
  },
  products: {
    name: 'Products',
    permissions: ['admin', 'manager'],
    component: 'Products'
  },
  profile: {
    name: 'Profile',
    permissions: ['admin', 'manager', 'user'],
    component: 'Profile'
  }
};

// Định nghĩa các API và quyền truy cập
const apiPermissions = {
  '/api/users': ['admin', 'user'],
  '/api/products': ['admin', 'manager'],
  '/api/profile': ['admin', 'manager', 'user']
};

// Middleware để kiểm tra quyền truy cập dựa trên vai trò (role)
const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Giải mã token JWT để lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;

    // Kiểm tra quyền truy cập API
    const apiPath = req.path;
    const apiPermission = apiPermissions[apiPath];
    if (apiPermission && !apiPermission.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Lọc menu dựa trên quyền truy cập của người dùng
    const filteredMenu = Object.entries(menu).reduce((acc, [key, value]) => {
      if (value.permissions.includes(role)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    req.user = decoded;
    req.menu = filteredMenu;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { authorize, menu };

// utils/logger.js
const winston = require('winston');

// Cấu hình bộ ghi nhật ký
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;

// utils/errorHandler.js
const logger = require('./logger');

// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;

// api/server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const profileRoutes = require('./routes/profileRoutes');
const logger = require('../utils/logger');
const errorHandler = require('../utils/errorHandler');
const { authorize } = require('../utils/authorization');

const app = express();
const port = 3000;

app.use(express.json());

// Cấu hình quyền truy cập cho các API
app.use('/api/users', authorize, userRoutes);
app.use('/api/products', authorize, productRoutes);
app.use('/api/profile', authorize, profileRoutes);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`API server running on port ${port}`);
});

// menu/server.js
const express = require('express');
const logger = require('../utils/logger');
const errorHandler = require('../utils/errorHandler');
const { authorize } = require('../utils/authorization');

const app = express();
const port = 3001;

app.use(express.json());

// Trả về menu đã được phân quyền
app.get('/menu', authorize, (req, res) => {
  res.status(200).json(req.menu);
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Menu server running on port ${port}`);
});