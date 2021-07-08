const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { constants } = require('./constants');
const { userRouter, authRouter } = require('./routes');
const { errorMessage } = require('./error');

const app = express();

// eslint-disable-next-line no-use-before-define
_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-use-before-define
app.use(_hadleErrors);
// eslint-disable-next-line no-use-before-define
app.use('*', _notFoundHandler);

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || errorMessage.UNKNOWN_ERROR.message,
      customCode: err.code || errorMessage.UNKNOWN_ERROR.code
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || errorMessage.ROUT_NOT_FOUND.code,
    message: err.message || errorMessage.ROUT_NOT_FOUND.message
  });
}

function _mongooseConnector() {
  mongoose.connect(constants.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
}
