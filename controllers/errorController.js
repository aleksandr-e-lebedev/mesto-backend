const { isCelebrate } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const consts = require('../configuration/constants');

const handleCelebrateError = (err) => {
  let error = {};

  error = err.message.includes('jwt')
    ? new UnauthorizedError(consts.AUTH_REQUIRED)
    : new BadRequestError(err.message);

  return error;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `${consts.INVALID_INPUT_DATA}. ${errors.join('. ')}`;

  return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"(.*)"/)[1];
  const message = `${value} - ${consts.DUPLICATE_FIELD_VALUE}`;

  return new ConflictError(message);
};

const handleJWTError = () => {
  const message = consts.INVALID_TOKEN;

  return new UnauthorizedError(message);
};

const handleJWTExpiredError = () => {
  const message = consts.EXPIRED_TOKEN;

  return new UnauthorizedError(message);
};

const createError = (err) => {
  let error = { ...err };
  error.message = err.message;

  if (isCelebrate(error)) error = handleCelebrateError(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  return error;
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: consts.SERVER_ERROR,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(createError(err), res);
  } else {
    sendErrorProd(createError(err), res);
  }
};
