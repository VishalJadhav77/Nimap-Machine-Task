const express = require('express');
const cors = require('cors'); // Enable CORS
const sequelize = require('./config/database'); // Sequelize setup
const categoryRoutes = require('./routes/categoryRoutes'); // Category routes
const productRoutes = require('./routes/productRoutes'); // Product routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Built-in middleware for parsing JSON

// Routes
app.use('/api/categories', categoryRoutes); // Categories route
app.use('/api/products', productRoutes); // Products route

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
  // Sync database
  try {
    await sequelize.sync({ force: false }); // Set force: true only for development
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error syncing database:', error.message);
  }
});
