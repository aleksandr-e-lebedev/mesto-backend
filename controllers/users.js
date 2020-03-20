const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { INVALID_EMAIL_OR_PASSWORD, USER_NOT_FOUND } = require('../configuration/constants');
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
    .then((user) => res.status(201).send(user))
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

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

exports.updateUserData = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

exports.updateUserAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};
