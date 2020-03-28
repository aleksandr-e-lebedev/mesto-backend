// Pre hook для Document.prototype.save()
const bcrypt = require('bcryptjs');

module.exports = function hashPassword() {
  return bcrypt.hash(this.password, 12)
    .then((hash) => {
      this.password = hash;
    });
};
