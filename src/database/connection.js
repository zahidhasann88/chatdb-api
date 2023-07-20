const Sequelize = require('sequelize');

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST, // Set the database host
  dialect: DB_DIALECT, // Set the database dialect (e.g., 'mysql', 'postgres', 'sqlite', 'mssql')
  logging: true, // Enable logging to the console
  define: {
    timestamps: false, // Disable the automatic creation of 'createdAt' and 'updatedAt' columns
  },
});

module.exports = sequelize;
