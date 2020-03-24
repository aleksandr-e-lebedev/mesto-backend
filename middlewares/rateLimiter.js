const rateLimit = require('express-rate-limit');

const { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } = require('../configuration/config');
const { TOO_MANY_REQUESTS } = require('../configuration/constants');

module.exports = rateLimit({
  windowMs: 1000 * 60 * RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
  message: { message: TOO_MANY_REQUESTS },
});
