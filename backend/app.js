require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const noteRoutes = require('./api/routes/notes');
const userRoutes = require('./api/routes/user');
const authMiddleware = require('./utilities/verifyToken');

// Listen to requests
const port = process.env.PORT || 4000;
// Connect to the database
mongoose.connect(process.env.MONGO_URI, () => {
  app.listen(port, () =>
    console.log(`Server and DB are up and running on port: ${port}`)
  );
});

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/note', authMiddleware, noteRoutes);
app.use('/api/auth', userRoutes);
