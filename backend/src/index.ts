import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './authRoutes';
//const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(express.json()); // for parsing application/json

// MongoDB connection
mongoose.connect( process.env.MONGODB_URI || '' )
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const PORT = process.env.PORT || 8000;

app.get('/api/', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.use('/api/accounts/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
