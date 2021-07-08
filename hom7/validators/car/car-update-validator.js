const Joi = require('joi');

module.exports = Joi.object({
  producer: Joi
    .string()
    .min(3)
    .max(20),
  year: Joi
    .number()
    .max(new Date().getFullYear())
    .min(new Date().getFullYear() - 180),
  price: Joi
    .number()
    .min(250)
    .max(9999999),
  model: Joi
    .string()
    .min(3)
    .max(40),
  status: Joi
    .string()
    .equal('active', 'sold')
});
