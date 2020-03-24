const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { rateLimiter, logger } = require('./middlewares');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(rateLimiter);

app.use(express.json());
app.use(cookieParser());

app.use(logger.requestLogger);
app.use(routes);

app.use(logger.errorLogger);
app.use(errorHandler);

module.exports = app;
