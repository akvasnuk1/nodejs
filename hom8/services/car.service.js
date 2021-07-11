const { Car } = require('../database');

module.exports = {
  getAllCars: () => Car.find({}),

  getCar: (carId) => Car.findById(carId),

  updateCar: (car, carData) => Car.updateOne(car, carData),

  deleteCar: async (car) => {
    await Car.deleteOne(car);
  },

  createCar: async (carData) => {
    await Car.create(carData);
  },

  getAllUserCarsDynamic: (userEmail, status = { $exists: true }) => Car.aggregate([
    {
      $lookup:
            {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'ownerCar'
            }
    },
    {
      $match: {
        'ownerCar.email': userEmail,
        status
      }
    }
  ]),

  getAllCarsByStatus: (status) => Car.find(status)
};
