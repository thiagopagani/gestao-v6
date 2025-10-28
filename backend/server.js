require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/api');

// Import models to ensure they are registered with Sequelize before sync
require('./models/Company');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/', apiRoutes);

// Database connection and server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models. Using { alter: true } is safer for development as it tries to update tables without dropping them.
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database or start the server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();