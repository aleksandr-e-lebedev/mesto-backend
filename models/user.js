const mongoose = require('mongoose');
const validator = require('validator');
const { setUpdateOptions } = require('../middlewares');

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
  },
});

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.path('avatar').validate(validator.isURL);

userSchema.set('versionKey', false);

module.exports = mongoose.model('user', userSchema);
