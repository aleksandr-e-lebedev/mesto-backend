const router = require('express').Router();

const getErrorPage = (req, res, next) => {
  next({ status: 404, message: { message: 'Запрашиваемый ресурс не найден' } });
};

router.use(getErrorPage);

module.exports = router;
