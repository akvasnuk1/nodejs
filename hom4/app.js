const express = require('express');
const mongoose = require('mongoose');

const { constants } = require('./constants/index');
const { userRouter } = require('./routes/index');

const app = express();

// eslint-disable-next-line no-use-before-define
_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);
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
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Rout not fond'
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/feb-2021', { useUnifiedTopology: true, useNewUrlParser: true });
}
