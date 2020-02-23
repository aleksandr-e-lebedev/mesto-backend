const express = require('express');
const path = require('path');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');
const { PORT: PORT_DEV } = require('./config.dev.json');

const { PORT = PORT_DEV } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(errorHandler);

app.listen(PORT);
