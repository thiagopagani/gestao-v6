// Import required packages
const express = require('express');
const cors = require('cors');
const path = require('path');

// **CRUCIAL FIX**: Configure dotenv to find the .env file in the current directory
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const sequelize = require('./config/database');
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// API Routes - All API calls are handled by this router
app.use('/', apiRoutes);

// Function to connect to DB and start the server
const startServer = async () => {
  try {
    // Test the database connection
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all defined models to the DB.
    // This creates the table if it doesn't exist (and does nothing if it already exists).
    await sequelize.sync(); 
    console.log('All models were synchronized successfully.');

    // Start the Express server only after the database is ready
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database or start the server:', error);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();
