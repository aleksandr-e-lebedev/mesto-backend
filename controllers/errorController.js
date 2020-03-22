const { isCelebrate } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const consts = require('../configuration/constants');

const handleCastErrorDB = (err) => {
  const message = `${consts.INVALID_REQUEST}: ${err.path}: ${err.value}`;

  return new BadRequestError(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `${consts.INVALID_INPUT_DATA}. ${errors.join('. ')}`;

  return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"(.*)"/)[1];
  const message = `${value} - ${consts.DUPLICATE_FIELD_VALUE}`;

  return new BadRequestError(message);
};

const handleJWTError = () => {
  const message = consts.INVALID_TOKEN;

  return new UnauthorizedError(message);
};

const createErrorProd = (err) => {
  let error = { ...err };
  error.message = err.message;

  if (isCelebrate(error)) error = error.joi;
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();

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
    sendErrorDev(err, res);
  } else {
    sendErrorProd(createErrorProd(err), res);
  }
};
