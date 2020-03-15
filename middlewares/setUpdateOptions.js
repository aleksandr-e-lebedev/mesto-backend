// Pre hook для Query.prototype.findOneAndUpdate()
module.exports = function setUpdateOptions() {
  const opts = { new: true, runValidators: true };

  this.setOptions(opts);
};
