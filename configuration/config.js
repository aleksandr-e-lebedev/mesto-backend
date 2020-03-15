const { PORT: PORT_DEV, DB: DB_DEV, TOKEN: TOKEN_DEV } = require('../config.dev.json');

const { PORT = PORT_DEV, DB = DB_DEV, TOKEN = TOKEN_DEV } = process.env;

module.exports = {
  PORT,
  DB,
  TOKEN,
};
