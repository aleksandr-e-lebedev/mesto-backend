const router = require('express').Router();

const {
  getUsers, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/usersController');

const {
  authPreValidator, auth, userPreValidator,
} = require('../middlewares');

const {
  jwtCookieReqCheck,
} = authPreValidator;

const {
  userIdReqCheck, updateUserDataReqCheck, updateUserAvatarReqCheck,
} = userPreValidator;

router.get('/', jwtCookieReqCheck, auth, getUsers);
router.get('/:userId', jwtCookieReqCheck, auth, userIdReqCheck, getUser);

router.patch('/me', jwtCookieReqCheck, auth, updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', jwtCookieReqCheck, auth, updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;
