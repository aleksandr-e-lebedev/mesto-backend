const mongoose = require('mongoose');

const app = require('./app');
const { DB, PORT } = require('./configuration/config');

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const server = app.listen(PORT);

process.on('unhandledRejection', () => {
  server.close(() => {
    process.exit(1);
  });
});
