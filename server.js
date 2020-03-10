const mongoose = require('mongoose');

const app = require('./app');
const { DB, PORT } = require('./configuration/config');

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
