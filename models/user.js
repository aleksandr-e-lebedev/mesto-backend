const mongoose = require('mongoose');
const validator = require('validator');

const { setUpdateOptions } = require('../middlewares');
const consts = require('../configuration/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, consts.USER_NAME_REQUIRED],
    minlength: [2, consts.USER_NAME_MIN_LENGTH],
    maxlength: [30, consts.USER_NAME_MAX_LENGTH],
  },
  about: {
    type: String,
    required: [true, consts.USER_ABOUT_REQUIRED],
    minlength: [2, consts.USER_ABOUT_MIN_LENGTH],
    maxlength: [30, consts.USER_ABOUT_MAX_LENGTH],
  },
  avatar: {
    type: String,
    required: [true, consts.USER_AVATAR_REQUIRED],
    validate: [validator.isURL, consts.USER_AVATAR_IS_URL],
  },
});

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.set('versionKey', false);

module.exports = mongoose.model('user', userSchema);
