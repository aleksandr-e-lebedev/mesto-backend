const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configuration/config');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  promisify(jwt.verify)(token, JWT_SECRET)
    .then((payload) => {
      req.user = payload;
      next();
    })
    .catch(next);
};
