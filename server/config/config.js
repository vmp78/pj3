require('dotenv').config();

const baseConfig = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres'
};

const config = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig
};

module.exports = config;
