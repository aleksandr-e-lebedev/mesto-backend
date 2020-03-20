const router = require('express').Router();
const { createUser, login } = require('../controllers/authController');
const {
  getUsers, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');
const { userPreValidator } = require('../middlewares');

const {
  createUserReqCheck,
  loginReqCheck,
  updateUserDataReqCheck,
  updateUserAvatarReqCheck,
} = userPreValidator;

router.post('/signup', createUserReqCheck, createUser);
router.post('/signin', loginReqCheck, login);

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;
