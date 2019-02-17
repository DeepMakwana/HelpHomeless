const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to the database:", config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("Database Error:", err);
});

// Initialize Express
const app = express();

// Import Routes
const users = require('./routes/users');
const sponsor = require('./routes/sponsor');
const donations = require('./routes/makeDonations');

// Port Number
const port = 3000;

// MIDDLEWARES
// CORS MIDDLEWARE
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', users);
app.use('/sponsor', sponsor);
app.use('/donations', donations);
// Index Route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log("Server started on port:", port);
});
