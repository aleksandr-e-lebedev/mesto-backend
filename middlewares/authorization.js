const { TOKEN } = require('../configuration/config');

module.exports = (req, res, next) => {
  req.user = { _id: TOKEN };
  next();
};
