const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND } = require('../configuration/constants');

const getErrorPage = (req, res, next) => {
  next(new NotFoundError(`${NOT_FOUND}: ${req.originalUrl}`));
};

router.use(getErrorPage);

module.exports = router;
