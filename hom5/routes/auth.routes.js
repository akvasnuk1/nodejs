const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewars');

router.post('/', authMiddleware.checkIsUserExist, authMiddleware.checkIsPasswordValid, authController.AuthUser);

module.exports = router;
