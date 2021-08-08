const dotenv = require("dotenv");

dotenv.config();

//Destructuring process.env
const {
  NODE_ENV = "development", //Saber en que entorno estamos, si no, development
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  ACCESS_TOKEN_SECRET,
  PORT,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
} = process.env;

const ENV = NODE_ENV || "development";

const CONFIG = {
  production: {
    app: {
      port: PORT || 4000, //coger variable port y si no 4000
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION, //valor de encryptacion
      secret: ACCESS_TOKEN_SECRET,
    },
  },
  development: {
    app: {
      port: PORT || 4000, //coger variable port y si no 4000
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT, //valor de encryptacion
      secret: ACCESS_TOKEN_SECRET,
    },
  },
  test: {
    app: {
      port: PORT || 4000, //coger variable port y si no 4000
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT, //valor de encryptacion
      secret: ACCESS_TOKEN_SECRET,
    },
  },
};

module.exports = CONFIG[ENV];
