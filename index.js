require('dotenv').config();

const express = require('express');
const sequelize = require('./src/database/connection');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const assistantRoutes = require('./src/routes/assistantRoutes');
app.use('/api/assistant', assistantRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    app.listen( process.env.APP_PORT, () => {
      console.log('Server is running on port ' + process.env.APP_PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
