const express = require('express');

const { constants } = require('./constants');
const { userRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
});
