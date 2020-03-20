const mongoose = require('mongoose');
const validator = require('validator');

const { hashPassword, setUpdateOptions } = require('../middlewares');
const isPasswordCorrect = require('../utils/isPasswordCorrect');
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
  email: {
    type: String,
    required: [true, consts.USER_EMAIL_REQUIRED],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, consts.USER_EMAIL_IS_EMAIL],
  },
  password: {
    type: String,
    required: [true, consts.USER_PASSWORD_REQUIRED],
    minlength: [8, consts.USER_PASSWORD_MIN_LENGTH],
    select: false,
  },
});

userSchema.pre('save', hashPassword);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.method('isPasswordCorrect', isPasswordCorrect);

userSchema.set('versionKey', false);

module.exports = mongoose.model('user', userSchema);
