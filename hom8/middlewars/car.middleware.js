const { carValidator, urlValidator } = require('../validators');
const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');
const { carService } = require('../services');

module.exports = {
  isCarDataValid: async (req, res, next) => {
    try {
      const { error } = await carValidator.createCarValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isCarUpdateDataValid: async (req, res, next) => {
    try {
      const { status } = req.params;

      const { error } = await carValidator.updateCarValidator.validate({ ...req.body, status });

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isCarExist: async (req, res, next) => {
    try {
      const { carId } = req.params;

      const { error } = await urlValidator.urlValidator.validate(carId);

      if (error) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.USER_ID_NOT_VALID.code);
      }

      const carById = await carService.getCar(carId);

      if (!carById) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      req.car = carById;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserHaveCar: (req, res, next) => {
    try {
      const { user: { _id }, car: { owner } } = req;

      if (owner._id.toString() !== _id.toString()) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.NOT_YOUR_CAR.message, errorMessage.NOT_YOUR_CAR.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

};
