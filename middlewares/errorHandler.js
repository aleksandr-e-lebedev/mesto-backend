const { SERVER_ERROR } = require('../configuration/constants');

module.exports = (err, req, res, next) => {
  const {
    status = 500,
    message: errMessage = SERVER_ERROR,
  } = err;

  res.status(status).send({ message: errMessage });
};
