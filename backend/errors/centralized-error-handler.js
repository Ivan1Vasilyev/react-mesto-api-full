const { DEFAULT_ERROR } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  return res
    .status(statusCode)
    .json({ message: statusCode === DEFAULT_ERROR ? 'На сервере произошла ошибка' : message });
};

module.exports = centralizedErrorHandler;
