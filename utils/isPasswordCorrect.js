// Instance method for the 'user' schema
const bcrypt = require('bcryptjs');

module.exports = function isPasswordCorrect(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};
