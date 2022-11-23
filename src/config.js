const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    SERVER: "http://localhost:3000",
  },
};

export default config[env];
