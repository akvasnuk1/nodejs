const { carService, userService } = require('../services');
const { successfulMessage, statusCode } = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

module.exports = {
  allCars: async (req, res, next) => {
    try {
      const cars = await carService.getAllCars();

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  getCar: async (req, res, next) => {
    try {
      const car = await carService.getCar(req.car);

      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      await carService.deleteCar(req.car);

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const { _id } = req.user;

      await carService.createCar({ ...req.body, owner: _id });

      res.status(statusCode.CREATED).json(successfulMessage.SUCCESSFUL_CREATED);
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { car } = req;
      await carService.updateCar(car, req.body);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateStatusCar: async (req, res, next) => {
    try {
      const { car } = req;
      const { status } = req.params;

      await carService.updateCar(car, { status });

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  getUserCars: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.findUserById(userId);

      const { email } = user;

      const cars = await carService.getAllUserCars(email);

      if (!cars.length) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_DOES_NOT_HAVE_CAR.message, errorMessage.USER_DOES_NOT_HAVE_CAR.code);
      }

      res.json(cars);
    } catch (e) {
      next(e);
    }
  }
};
