const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum } = require('../constants');

const carSchema = new Schema({
  producer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTablesEnum.USER
  },
  documents: [],
  photos: [],
  videos: [],
}, { timestamps: true });

carSchema.pre('find', function() {
  this.populate('owner');
});
carSchema.pre('findOne', function() {
  this.populate('owner');
});

module.exports = model(dataBaseTablesEnum.Car, carSchema);
