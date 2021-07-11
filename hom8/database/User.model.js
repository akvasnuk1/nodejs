const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants/index');

const userSchema = new Schema({
  avatar: {
    type: String
  },
  documents: {
    type: Array
  },
  photos: {
    type: Array
  },
  videos: {
    type: Array
  },
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
  },
  carOwner: {
    type: Schema.Types.ObjectId,
    ref: dataBaseTablesEnum.Car
  }
}, { timestamps: true });

userSchema.pre('findOne', function() {
  this.populate('owner');
});

module.exports = model(dataBaseTablesEnum.USER, userSchema);
