const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { constants, statusCode } = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, constants.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({}, constants.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secretWord = tokenType === 'access'
        ? constants.ACCESS_TOKEN_SECRET
        : constants.REFRESH_TOKEN_SECRET;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, e.message, errorMessage.UNAUTHORIZED.code);
    }
  }
};
