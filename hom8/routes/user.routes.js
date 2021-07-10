const router = require('express').Router();

const { userController, carController } = require('../controllers');
const {
  userMiddleware, authMiddleware, carMiddleware, fileMiddleware
} = require('../middlewars');

router.get('/', userController.allUser);

// eslint-disable-next-line max-len
router.post('/', fileMiddleware.checkFiles, fileMiddleware.checkAvatar, userMiddleware.isUserDataValid, userMiddleware.isUserRegister, userController.createUser);

router.use('/:userId', userMiddleware.isUserExists);

router.get('/:userId', userController.getUser);

router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUser);

// eslint-disable-next-line max-len
router.patch('/:userId', userMiddleware.isUserUpdateDataValid, authMiddleware.checkAccessToken, userController.updateUser);

router.get('/:userId/cars', carController.getUserCars);

router.get('/:userId/cars/:status', carMiddleware.isCarUpdateDataValid, carController.getUserCars);

router.get('/:userId/cars/:carId', carMiddleware.isCarExist, carController.getCar);

router.post('/:userId/photos', authMiddleware.checkAccessToken, fileMiddleware.checkFiles, userController.addPhotos);

// router.delete('/:userId/photos/:photo', authMiddleware.checkAccessToken, userController.deletePhotos);

module.exports = router;
