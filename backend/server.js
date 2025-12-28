// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const formsRouter = require('./routes/forms');

const app = express();

// Middlewares
app.use(cors()); // allow all origins (customize as needed)
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/forms', formsRouter);

app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL server');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
