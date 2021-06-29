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

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
});

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/feb-2021', { useUnifiedTopology: true, useNewUrlParser: true });
}
