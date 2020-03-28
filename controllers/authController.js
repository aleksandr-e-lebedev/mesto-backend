const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INVALID_EMAIL_OR_PASSWORD } = require('../configuration/constants');
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN } = require('../configuration/config');

const signToken = (_id) => jwt.sign(
  { _id },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN },
);

const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * JWT_COOKIE_EXPIRES_IN,
    httpOnly: true,
  };

  user.password = undefined;

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).send(user);
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => createSendToken(res, 201, user))
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD));
        return;
      }

      user.isPasswordCorrect(password, user.password)
        .then((correctPassword) => {
          if (!correctPassword) {
            next(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD));
            return;
          }

          createSendToken(res, 200, user);
        });
    })
    .catch(next);
};
