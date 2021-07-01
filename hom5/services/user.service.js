const { User } = require('../database');

module.exports = {
  getAllUsers: () => User.find({}),

  insertUser: async (user) => {
    await User.create(user);
  },

  findUserById: (userID) => User.findById(userID),

  updateUser: async (userId, updatedUser) => {
    await User.findByIdAndUpdate(userId, updatedUser);
  },

  deleteUser: async (userID) => {
    await User.findByIdAndDelete(userID);
  },

  findUserByEmail: (email) => User.findOne({ email })
};
