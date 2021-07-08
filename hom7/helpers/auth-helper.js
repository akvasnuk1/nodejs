const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  constants: {
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS
  },
  statusCode
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TIME });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secretWord = tokenType === ACCESS
        ? ACCESS_TOKEN_SECRET
        : REFRESH_TOKEN_SECRET;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, e.message, errorMessage.UNAUTHORIZED.code);
    }
  }
};
