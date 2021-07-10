module.exports = {
  NOT_VALID_DATA: {
    code: 4220
  },
  USER_IS_REGISTER: {
    message: 'You are registered',
    code: 4001
  },
  USER_ID_NOT_VALID: {
    code: 4002
  },
  USER_NOT_EXISTS: {
    message: 'User does not exists',
    code: 4003
  },
  WRONG_EMAIL_OR_PASS: {
    message: 'Wrong email or password',
    code: 4004
  },
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    code: 0
  },
  ROUT_NOT_FOUND: {
    message: 'Rout not found',
    code: 4040
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    code: 4010
  },
  NO_TOKEN: {
    message: 'No token',
    code: 4011
  },
  WRONG_TOKEN: {
    message: 'Wrong token',
    code: 4012
  },
  WRONG_TEMPLATE: {
    message: 'Wrong template',
    code: 4041
  },
  USER_DOES_NOT_HAVE_CAR: {
    message: 'User does not have car',
    code: 4042
  },
  DONT_HAVE_ACTIVE_OR_SOLD_CAR: {
    message: 'Dont have active or sold car',
    code: 4043
  },
  INVALID_FORMAT: {
    message: 'Invalid format',
    code: 4150
  },
  FILE_SIZE_IS_TOO_LARGE: {
    message: (file) => `File ${file} is too big`,
    code: 4130
  },
  JUST_ONE_PHOTO: {
    message: 'Just one avatar for user',
    code: 4044
  }

};
