const { User } = require('../database/index');

module.exports = {
  getAllUsers: async () => {
    const users = await User.find({});

    return users;
  },

  insertUser: async (user) => {
    await User.create(user);
  },

  findUserById: async (userID) => {
    const usersById = await User.findById(userID);

    return usersById;
  },

  updateUser: async (userId, updatedUser) => {
    await User.findByIdAndUpdate(userId, updatedUser);
  },

  deleteUser: async (userID) => {
    await User.findByIdAndDelete(userID);
  },

  findUserByEmail: async (userEmail) => {
    const userByEmail = await User.find({ email: userEmail });

    return userByEmail;
  }

};
