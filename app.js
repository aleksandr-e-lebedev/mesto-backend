const express = require('express');

const routes = require('./routes');
const { authorization, logger } = require('./middlewares');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(authorization);
app.use(express.json());
app.use(logger.requestLogger);
app.use(routes);
app.use(logger.errorLogger);
app.use(errorHandler);

module.exports = app;
