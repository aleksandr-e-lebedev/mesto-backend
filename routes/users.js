const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');
const { userPreValidator } = require('../middlewares');

const {
  createUserReqCheck,
  updateUserDataReqCheck,
  updateUserAvatarReqCheck,
} = userPreValidator;

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUserReqCheck, createUser);
router.patch('/me', updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;
