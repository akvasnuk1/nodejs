const router = require('express').Router();

const { carController } = require('../controllers');
const { authMiddleware, carMiddleware, userMiddleware } = require('../middlewars');

router.get('/', carController.allCars);

router.post('/', carMiddleware.isCarDataValid, authMiddleware.checkAccessToken, carController.createCar);

router.use('/:userId', userMiddleware.isUserExists);

router.get('/:userId', carController.getUserCars);

router.get('/:userId/:status', carMiddleware.isCarUpdateDataValid, carController.getUserCars);

router.get('/:status', carMiddleware.isCarUpdateDataValid, carController.getCarsByStatus);

router.use('/:carId', carMiddleware.isCarExist);

router.get('/:carId', carController.getCar);

router.delete('/:carId', authMiddleware.checkAccessToken, carController.deleteCar);

router.patch('/:carId', carMiddleware.isCarUpdateDataValid, authMiddleware.checkAccessToken, carController.updateCar);

// eslint-disable-next-line max-len
router.patch('/:carId/:status', carMiddleware.isCarUpdateDataValid, authMiddleware.checkAccessToken, carController.updateStatusCar);

module.exports = router;
