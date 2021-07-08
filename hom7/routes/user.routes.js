const router = require('express').Router();

const { userController, carController } = require('../controllers');
const { userMiddleware, authMiddleware, carMiddleware } = require('../middlewars');

router.get('/', userController.allUser);

router.post('/', userMiddleware.isUserDataValid, userMiddleware.isUserRegister, userController.createUser);

router.get('/:userId', userMiddleware.isUserExists, userController.getUser);

router.delete('/:userId', userMiddleware.isUserExists, authMiddleware.checkAccessToken, userController.deleteUser);

// eslint-disable-next-line max-len
router.patch('/:userId', userMiddleware.isUserUpdateDataValid, userMiddleware.isUserExists, authMiddleware.checkAccessToken, userController.updateUser);

router.get('/:userId/cars/:status', carController.getUserCarsByStatus);

router.get('/:userId/cars/:carId', carMiddleware.isCarExist, carController.getCar);

router.get('/:userId/cars', carController.getUserCars);

module.exports = router;
