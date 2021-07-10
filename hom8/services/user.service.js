const { User } = require('../database');

module.exports = {
  getAllUsers: () => User.find({}),

  insertUser: (user) => User.create(user),

  findUserById: (userID) => User.findById(userID),

  updateUser: (user, updatedUser) => User.updateOne(user, updatedUser),

  deleteUser: async (user) => {
    await User.deleteOne(user);
  },

  findUserByEmail: (email) => User.findOne({ email })
};
