const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

const transactions = require('./routes/transactions');

const app = express();

// ✅ CORS (important for Vercel frontend)
app.use(cors({ origin: "*" }));

// Body parser
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ✅ Test route (IMPORTANT)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/v1/transactions', transactions);

// ✅ Handle production (optional but recommended)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);