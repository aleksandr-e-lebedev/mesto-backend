const { SERVER_ERROR, INVALID_REQUEST, INVALID_INPUT_DATA } = require('../configuration/constants');
const BadRequest = require('../errors/BadRequestError');

const handleCastErrorDB = (err) => {
  const message = `${INVALID_REQUEST}: ${err.path}: ${err.value}`;

  return new BadRequest(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `${INVALID_INPUT_DATA}. ${errors.join('. ')}`;

  return new BadRequest(message);
};

const createErrorProd = (err) => {
  let error = { ...err };
  error.message = err.message;

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

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
      message: SERVER_ERROR,
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
