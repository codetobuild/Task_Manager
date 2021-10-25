const Bcrypt = require("bcryptjs");

const passwordUtils = {
  validatePassword: async (password, hashPassword) => {
    const hashVerify = await Bcrypt.compare(password, hashPassword);
    return hashVerify;
  },

  hashPassword: async (password) => {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(password, salt);
    return hash;
  },
};

module.exports = passwordUtils;
