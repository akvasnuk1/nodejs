const { User } = require('../database');

module.exports = {
  getAllUsers: async () => {
    const users = await User.find({});

    return users;
  },

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

  findUserByEmail: (userEmail) => User.findOne({ email: userEmail })
};
