const mongoose = require('mongoose');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'development') dotenv.config();

const exceptionLogger = require('./utils/exceptionLogger');

process.on('uncaughtException', (err) => {
  exceptionLogger.error(err);
});

const app = require('./app');
const { DB, PORT } = require('./configuration/config');
const errorLogger = require('./utils/errorLogger');

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const server = app.listen(PORT);

process.on('unhandledRejection', (err) => {
  errorLogger.error(err);
  server.close(() => {
    process.exit(1);
  });
});
