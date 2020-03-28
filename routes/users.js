const router = require('express').Router();

const {
  getUsers, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/usersController');

const {
  auth, userPreValidator,
} = require('../middlewares');

const {
  userIdReqCheck, updateUserDataReqCheck, updateUserAvatarReqCheck,
} = userPreValidator;

router.get('/', auth, getUsers);
router.get('/:userId', auth, userIdReqCheck, getUser);

router.patch('/me', auth, updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', auth, updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;
