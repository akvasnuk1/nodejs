const { statusCode } = require('../constants');

module.exports = {
  AuthUser: (req, res, next) => {
    try {
      res.status(statusCode.UPDATED).json(req.user);
    } catch (e) {
      next(e);
    }
  }
};
