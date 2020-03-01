const router = require('express').Router();
const { getUsers } = require('../controllers/users');
const { readJsonFile, sendJson } = require('../middlewares');

const doesUserExist = (req, res, next) => {
  const { json: users } = res.locals;
  const { id } = req.params;
  const user = users.find((item) => item._id === id);

  if (user) {
    res.locals = { json: user };
    next();
  } else {
    next({ status: 404, message: { message: 'Нет пользователя с таким id' } });
  }
};

router.get('/', getUsers);
router.get('/:id', readJsonFile, doesUserExist, sendJson);

module.exports = router;
