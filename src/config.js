const env = process.env.NODE_ENV || "development";

const config = {
  test: {
    SERVER: "http://localhost:3000",
  },
  development: {
    SERVER: "http://localhost:3000",
  },
};

export default config[env];
