`use strict`;

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || `default`,
    expiresIn: process.env.EXPIRESIN || `1d`,
  },
};
