const http = require('http');
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const runnerQueries = require('./queries/runnerqueries');
const runners = require('./routes/runners');
const morgan = require('morgan');

const devMode = process.env.NODE_ENV !== 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(devMode ? 'dev' : 'combined'));
app.use(cors());

app.get('/api/beta', (req, res) => {
  res.json({
    message: 'Welcome to the High Lonesome 100 Runner API',
  });
});

app.use('/api/beta/', runners);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
