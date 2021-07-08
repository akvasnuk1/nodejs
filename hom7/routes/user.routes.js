const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewars');

router.get('/', userController.allUser);

router.post('/', userMiddleware.isUserDataValid, userMiddleware.isUserRegister, userController.createUser);

router.use('/:userId', userMiddleware.isUserExists, authMiddleware.checkAccessToken);

router.get('/:userId', userController.getUser);

router.delete('/:userId', userController.deleteUser);

router.patch('/:userId', userMiddleware.isUserUpdateDataValid, userController.updateUser);

module.exports = router;
