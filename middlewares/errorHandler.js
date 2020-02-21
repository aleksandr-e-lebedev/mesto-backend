const defaultErrorStatus = 500;

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const {
    status = defaultErrorStatus,
    message = { message: 'Что-то пошло не так' },
  } = err;

  res.status(status).send(message);
};

module.exports = errorHandler;
