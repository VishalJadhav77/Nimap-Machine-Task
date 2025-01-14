require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Use environment variables to configure the database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,   // Database host
    port: process.env.DB_PORT,   // Database port
    dialect: process.env.DB_DIALECT, // Database dialect
    logging: false,              // Disable query logging
  }
);

// Test the connection to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();

module.exports = sequelize;
