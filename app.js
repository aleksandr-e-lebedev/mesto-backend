const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT, DB } = require('./configuration/config');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(errorHandler);

app.listen(PORT);
