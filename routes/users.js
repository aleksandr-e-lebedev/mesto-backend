const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUserData,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserData);

module.exports = router;
