const router = require('express').Router();

const { carController } = require('../controllers');
const {
  authMiddleware, carMiddleware, fileMiddleware
} = require('../middlewars');

router.get('/', carController.allCars);

router.post('/', carMiddleware.isCarDataValid, authMiddleware.checkAccessToken, carController.createCar);

router.get('/status/:status', carMiddleware.isCarUpdateDataValid, carController.getCarsByStatus);

router.use('/:carId', carMiddleware.isCarExist);

router.get('/:carId', carController.getCar);

router.delete('/:carId', authMiddleware.checkAccessToken, carController.deleteCar);

router.patch('/:carId', carMiddleware.isCarUpdateDataValid, authMiddleware.checkAccessToken, carController.updateCar);

router.patch('/:carId/:status',
  carMiddleware.isCarUpdateDataValid,
  authMiddleware.checkAccessToken,
  carController.updateStatusCar);

router.post('/:carId/loadFiles/:files',
  authMiddleware.checkAccessToken,
  carMiddleware.isUserHaveCar,
  fileMiddleware.checkFiles,
  fileMiddleware.checkFilesPath,
  carController.addFilesOrRemove);

router.delete('/:carId/deleteFiles/:files',
  carMiddleware.isCarExist,
  authMiddleware.checkAccessToken,
  carMiddleware.isUserHaveCar,
  fileMiddleware.checkFilesPath,
  carController.addFilesOrRemove);

module.exports = router;
