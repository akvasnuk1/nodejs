const router = require('express').Router();

const { carController } = require('../controllers');
const { authMiddleware, carMiddleware } = require('../middlewars');

router.get('/', carController.allCars);

router.post('/', carMiddleware.isCarDataValid, authMiddleware.checkAccessToken, carController.createCar);

router.get('/status/:status', carMiddleware.isCarUpdateDataValid, carController.getCarsByStatus);

router.use('/:carId', carMiddleware.isCarExist);

router.get('/:carId', carController.getCar);

router.delete('/:carId', authMiddleware.checkAccessToken, carController.deleteCar);

router.patch('/:carId', carMiddleware.isCarUpdateDataValid, authMiddleware.checkAccessToken, carController.updateCar);

// eslint-disable-next-line max-len
router.patch('/:carId/:status', carMiddleware.isCarUpdateDataValid, authMiddleware.checkAccessToken, carController.updateStatusCar);

module.exports = router;
