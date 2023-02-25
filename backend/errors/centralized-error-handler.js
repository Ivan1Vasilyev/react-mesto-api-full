const { DEFAULT_ERROR } = require('../utils/constants');
const { DEFAULT_ERROR_MESSAGE } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  return res
    .status(statusCode)
    .json({ message: statusCode === DEFAULT_ERROR ? DEFAULT_ERROR_MESSAGE : message });
};

module.exports = centralizedErrorHandler;
