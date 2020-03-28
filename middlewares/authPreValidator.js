const { celebrate, Joi, Segments } = require('celebrate');

exports.jwtCookieReqCheck = celebrate({
  [Segments.COOKIES]: Joi.object({
    jwt: Joi.string()
      .required(),
  }).unknown(),
});
