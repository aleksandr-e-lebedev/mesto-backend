const mongoose = require('mongoose');
const validator = require('validator');

const { setUpdateOptions } = require('../middlewares');
const consts = require('../configuration/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: [validator.isURL, consts.CARD_LINK_IS_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.pre('findOneAndUpdate', setUpdateOptions);

cardSchema.set('versionKey', false);

module.exports = mongoose.model('card', cardSchema);
