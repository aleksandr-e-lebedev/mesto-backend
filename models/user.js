const mongoose = require('mongoose');
const validator = require('validator');

const { hashPassword, setUpdateOptions } = require('../middlewares');
const isPasswordCorrect = require('../utils/isPasswordCorrect');
const consts = require('../configuration/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: [validator.isURL, consts.USER_AVATAR_IS_URL],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, consts.USER_EMAIL_IS_EMAIL],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.pre('save', hashPassword);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.method('isPasswordCorrect', isPasswordCorrect);

userSchema.set('versionKey', false);

module.exports = mongoose.model('user', userSchema);
