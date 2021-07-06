const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants/index');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    default: 40
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USER, userSchema);
