const { celebrate, Joi, Segments } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');
const consts = require('../configuration/constants');

const createUserReqCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_NAME_REQUIRED)),
    about: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_ABOUT_REQUIRED)),
    avatar: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_AVATAR_REQUIRED)),
    email: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_EMAIL_REQUIRED)),
    password: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_PASSWORD_REQUIRED)),
  }),
});

const updateUserDataReqCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_NAME_REQUIRED)),
    about: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_ABOUT_REQUIRED)),
  }),
});

const updateUserAvatarReqCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .error(new BadRequestError(consts.USER_AVATAR_REQUIRED)),
  }),
});

module.exports = {
  createUserReqCheck,
  updateUserDataReqCheck,
  updateUserAvatarReqCheck,
};
