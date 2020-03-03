const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB } = require('./configuration/config');
const routes = require('./routes');
const { authorization, errorHandler } = require('./middlewares');

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(authorization);
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT);
