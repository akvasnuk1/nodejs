const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewars');

router.post('/login',
  authMiddleware.checkIsUserDataValid,
  authMiddleware.checkIsUserExist,
  authMiddleware.checkIsPasswordValid,
  authController.login);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

module.exports = router;
