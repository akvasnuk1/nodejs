module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/feb-2021',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SECRET TOKEN',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'SECRET TOKEN SECRET',
  AUTHORIZATION: 'Authorization',
  ACCESS: 'access',
  REFRESH: 'refresh',
  ACCESS_TOKEN_TIME: '30m',
  REFRESH_TOKEN_TIME: '1d'
};
