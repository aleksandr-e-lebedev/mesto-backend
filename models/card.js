const mongoose = require('mongoose');
const validator = require('validator');

const { setUpdateOptions } = require('../middlewares');
const consts = require('../configuration/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, consts.CARD_NAME_REQUIRED],
    minlength: [2, consts.CARD_NAME_MIN_LENGTH],
    maxlength: [30, consts.CARD_NAME_MAX_LENGTH],
  },
  link: {
    type: String,
    required: [true, consts.CARD_LINK_REQUIRED],
    validate: [validator.isURL, consts.CARD_LINK_IS_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, consts.CARD_OWNER_REQUIRED],
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
