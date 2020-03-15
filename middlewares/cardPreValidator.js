const { celebrate, Joi, Segments } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');
const consts = require('../configuration/constants');

const createCardReqCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(new BadRequestError(consts.CARD_NAME_REQUIRED)),
    link: Joi.string()
      .required()
      .error(new BadRequestError(consts.CARD_LINK_REQUIRED)),
  }),
});

module.exports = {
  createCardReqCheck,
};
