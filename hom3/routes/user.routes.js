const router = require('express').Router();

const { userController } = require('../controllers/index');
const { userMiddleware } = require('../middlewars/index');

router.get('/', userController.allUser);

router.get('/:userId', userMiddleware.isUserExists, userController.getUser);

router.post('/', userMiddleware.isUserRegister, userController.createUser);

router.delete('/:userId', userMiddleware.isUserExists, userController.deleteUser);

router.patch('/:userId', userMiddleware.isUserExists, userMiddleware.isUserRegister, userController.updateUser);

module.exports = router;
