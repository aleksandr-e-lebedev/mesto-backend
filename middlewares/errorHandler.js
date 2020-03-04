const SERVER_ERROR = 'Что-то пошло не так';

module.exports = (err, req, res, next) => {
  const {
    status = 500,
    message: errMessage = SERVER_ERROR,
  } = err;

  res.status(status).send({ message: errMessage });
};
