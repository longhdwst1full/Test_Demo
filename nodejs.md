// utils/authorization.js
const jwt = require('jsonwebtoken');
const logger = require('./logger');

// Định nghĩa menu và quyền truy cập
const menu = {
  dashboard: {
    name: 'Dashboard',
    permissions: ['admin', 'manager', 'user']
  },
  users: {
    name: 'Users',
    permissions: ['admin']
  },
  products: {
    name: 'Products',
    permissions: ['admin', 'manager']
  },
  profile: {
    name: 'Profile',
    permissions: ['admin', 'manager', 'user']
  }
};

// Middleware để kiểm tra quyền truy cập dựa trên vai trò (role)
const authorize = (permissions = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Giải mã token JWT để lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { role } = decoded;

      // Kiểm tra xem vai trò của người dùng có được phép thực hiện các quyền yêu cầu hay không
      const menuPermissions = permissions.map(p => menu[p].permissions);
      if (permissions.length && !menuPermissions.some(p => p.includes(role))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      logger.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
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
const logger = require('../utils/logger');
const errorHandler = require('../utils/errorHandler');
const { authorize } = require('../utils/authorization');

const app = express();
const port = 3000;

app.use(express.json());

// Cấu hình quyền truy cập cho các API
app.use('/api/users', authorize(['admin', 'user']), userRoutes);
app.use('/api/products', authorize(['admin', 'manager']), productRoutes);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`API server running on port ${port}`);
});

// api/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Định nghĩa các đường dẫn và các hàm controller tương ứng
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

// menu/server.js
const express = require('express');
const dashboardRoutes = require('./routes/dashboardRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const logger = require('../utils/logger');
const errorHandler = require('../utils/errorHandler');
const { authorize, menu } = require('../utils/authorization');

const app = express();
const port = 3001;

app.use(express.json());

// Cấu hình quyền truy cập cho menu
app.use('/menu/dashboard', authorize(['dashboard']), dashboardRoutes);
app.use('/menu/users', authorize(['users']), usersRoutes);
app.use('/menu/products', authorize(['products']), productsRoutes);
app.use('/menu/profile', authorize(['profile']), profileRoutes);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Menu server running on port ${port}`);
});