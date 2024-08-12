
// utils/errorHandler.js
const logger = require('./logger.js');

// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;