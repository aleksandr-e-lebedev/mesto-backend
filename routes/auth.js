const router = require('express').Router();

const {
  createUser, login,
} = require('../controllers/authController');

const {
  userPreValidator,
} = require('../middlewares');

const {
  createUserReqCheck, loginReqCheck,
} = userPreValidator;

router.post('/signup', createUserReqCheck, createUser);
router.post('/signin', loginReqCheck, login);

module.exports = router;
