const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const { carService } = require('../services');
const {
  successfulMessage,
  statusCode,
  directoryName: { CARS }
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');
const { fileHelper } = require('../helpers');

const rmdir = promisify(fs.rmdir);

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
      const { email } = req.user;
      const { status } = req.params;

      const cars = await carService.getAllUserCarsDynamic(email, status);

      if (!cars.length) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_DOES_NOT_HAVE_CAR.message, errorMessage.USER_DOES_NOT_HAVE_CAR.code);
      }

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  getCarsByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;

      const cars = await carService.getAllCarsByStatus({ status });

      if (!cars.length) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.DONT_HAVE_ACTIVE_OR_SOLD_CAR.message, errorMessage.DONT_HAVE_ACTIVE_OR_SOLD_CAR.code);
      }

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  addFilesOrRemove: async (req, res, next) => {
    try {
      const {
        car: { _id },
        params: { files },
        url,
        car
      } = req;

      if (url.includes('deleteFiles')) {
        await rmdir(path.join(process.cwd(), 'static', CARS, _id.toString(), files), { recursive: true });

        await carService.updateCar({ _id }, { [files]: [] });

        res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);

        return;
      }

      const chosenFiles = req[files];

      if (!chosenFiles.length) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.WRONG_FILE_LOAD_PATH.message, errorMessage.WRONG_FILE_LOAD_PATH.code);
      }

      const pathArray = await fileHelper._filesSaver(chosenFiles, _id, files, CARS);

      if (car[files].length) {
        const filesArray = car[files];

        filesArray.push(...pathArray);

        filesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        Object.assign(car, { filesArray });

        await carService.updateCar({ _id }, car);

        res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);

        return;
      }

      Object.assign(car, { [files]: pathArray });

      await carService.updateCar({ _id }, car);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
