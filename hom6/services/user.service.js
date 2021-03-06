const { User } = require('../database');

module.exports = {
  getAllUsers: () => User.find({}),

  insertUser: async (user) => {
    await User.create(user);
  },

  findUserById: (userID) => User.findById(userID),

  updateUser: async (user, updatedUser) => {
    await User.updateOne(user, updatedUser);
  },

  deleteUser: async (user) => {
    await User.deleteOne(user);
  },

  findUserByEmail: (email) => User.findOne({ email })
};
