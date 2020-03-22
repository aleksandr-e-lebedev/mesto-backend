const router = require('express').Router();

const {
  createUser, login,
} = require('../controllers/authController');

const {
  getUsers, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/usersController');

const {
  auth, userPreValidator,
} = require('../middlewares');

const {
  createUserReqCheck, loginReqCheck, updateUserDataReqCheck, updateUserAvatarReqCheck,
} = userPreValidator;

router.post('/signup', createUserReqCheck, createUser);
router.post('/signin', loginReqCheck, login);

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);

router.patch('/me', auth, updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', auth, updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;
