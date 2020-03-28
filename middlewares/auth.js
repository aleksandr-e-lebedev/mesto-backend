const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { AUTH_REQUIRED } = require('../configuration/constants');
const { JWT_SECRET } = require('../configuration/config');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError(AUTH_REQUIRED));
    return;
  }

  promisify(jwt.verify)(token, JWT_SECRET)
    .then((payload) => {
      req.user = payload;
      next();
    })
    .catch(next);
};
