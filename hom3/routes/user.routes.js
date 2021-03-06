const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewars');

router.get('/', userController.allUser);

router.post('/', userMiddleware.isUserRegister, userMiddleware.isFieldEmpty, userController.createUser);

router.get('/:userId', userMiddleware.isUserExists, userController.getUser);

router.delete('/:userId', userMiddleware.isUserExists, userController.deleteUser);

router.patch('/:userId', userMiddleware.isUserExists,
  userMiddleware.isEmailEmpty,
  userMiddleware.isUserRegister,
  userController.updateUser);

module.exports = router;
