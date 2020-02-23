const sendJson = (req, res) => {
  res.send(res.locals.json);
};

module.exports = sendJson;
