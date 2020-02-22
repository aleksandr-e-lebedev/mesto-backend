const defaultErrorStatus = 500;

const errorHandler = (err, req, res, next) => {
  const {
    status = defaultErrorStatus,
    message = { message: 'Что-то пошло не так' },
  } = err;

  res.status(status).send(message);
};

module.exports = errorHandler;
