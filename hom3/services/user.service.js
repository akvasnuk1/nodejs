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
    const usersData = await readFilePromise(constants.DB_URL);
    const users = JSON.parse(usersData.toString());

    const user = users.find((userData) => userData.id === +userID);

    return user;
  },

  updateUser: async (userId, newUserData) => {
    const usersData = await readFilePromise(constants.DB_URL);
    const users = JSON.parse(usersData.toString());

    const user = users.find((userData) => userData.id === +userId);
    const userIndex = users.indexOf(user);

    const updatedUser = { ...users[userIndex], ...newUserData };

    users.splice(userIndex, 1, updatedUser);
    await writeFailPromise(constants.DB_URL, JSON.stringify(users));
  },

  deleteUser: async (userID) => {
    const usersData = await readFilePromise(constants.DB_URL);
    const users = JSON.parse(usersData.toString());

    const user = users.find((userData) => userData.id === +userID);
    const userIndex = users.indexOf(user);

    users.splice(userIndex, 1);
    await writeFailPromise(constants.DB_URL, JSON.stringify(users));
  }
};
