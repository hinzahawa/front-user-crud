const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    SERVER: "http://localhost:3000",
  },
};

module.exports = config[env];
