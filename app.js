const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes');
const { errorHandler } = require('./middlewares');
const { PORT: PORT_DEV, DB: DB_DEV } = require('./config.dev.json');

const { PORT = PORT_DEV, DB = DB_DEV } = process.env;

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(errorHandler);

app.listen(PORT);
