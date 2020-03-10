const express = require('express');

const routes = require('./routes');
const { authorization, errorHandler } = require('./middlewares');

const app = express();

app.use(authorization);
app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
