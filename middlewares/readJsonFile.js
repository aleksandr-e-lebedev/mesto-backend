const fsPromises = require('fs').promises;
const path = require('path');

const readJsonFile = (req, res, next) => {
  const dataPath = path.join(path.dirname(process.mainModule.filename), 'data', `${req.baseUrl}.json`);

  fsPromises.readFile(dataPath, 'utf8')
    .then((data) => {
      const json = JSON.parse(data);

      res.locals = { json };
      next();
    })
    .catch(() => next('Error'));
};

module.exports = readJsonFile;
