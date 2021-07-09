const router = require('express').Router();

const { userController, carController } = require('../controllers');
const { userMiddleware, authMiddleware, carMiddleware } = require('../middlewars');

router.get('/', userController.allUser);

router.post('/', userMiddleware.isUserDataValid, userMiddleware.isUserRegister, userController.createUser);

router.use('/:userId', userMiddleware.isUserExists);

router.get('/:userId', userController.getUser);

router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUser);

// eslint-disable-next-line max-len
router.patch('/:userId', userMiddleware.isUserUpdateDataValid, authMiddleware.checkAccessToken, userController.updateUser);

router.get('/:userId/cars', carController.getUserCars);

router.get('/:userId/cars/:status', carMiddleware.isCarUpdateDataValid, carController.getUserCarsByStatus);

router.get('/:userId/cars/:carId', carMiddleware.isCarExist, carController.getCar);

module.exports = router;
