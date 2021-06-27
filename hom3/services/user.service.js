const fs = require('fs');
const { promisify } = require('util');

const { constants } = require('../constants/index');

const readFilePromise = promisify(fs.readFile);
const writeFailPromise = promisify(fs.writeFile);

module.exports = {
  getAllUsers: async () => {
    const users = await readFilePromise(constants.DB_URL);
    return JSON.parse(users.toString());
  },
  insertUser: async (userData) => {
    await writeFailPromise(constants.DB_URL, JSON.stringify(userData));
  },
  findUserById: async (userID) => {
    const users = JSON.parse((await readFilePromise(constants.DB_URL)).toString());
    return users[userID - 1];
  },
  updateUser: async (userId, newUserData) => {
    const users = JSON.parse((await readFilePromise(constants.DB_URL)).toString());
    users.splice(userId, 1, newUserData);
    await writeFailPromise(constants.DB_URL, JSON.stringify(users));
  },
  deleteUser: async (userID) => {
    const users = JSON.parse((await readFilePromise(constants.DB_URL)).toString());
    users.splice(userID, 1);
    await writeFailPromise(constants.DB_URL, JSON.stringify(users));
  }
};
