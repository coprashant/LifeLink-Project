const express = require('express');
const session = require('express-session');
const path = require('path');
const frontendPath = path.join(process.cwd(), 'Frontend');
require('dotenv').config();

// 1. Import the routes (this contains the handleLogin logic)
const authRoutes = require('./routes/authRoutes'); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(frontendPath));

app.use(session({
    secret: process.env.SESSION_SECRET || 'thapathali_campus_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// 2. Use the routes
app.use('/', authRoutes); 

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html')); 
});
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'register.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'home.html'));
});

module.exports = app;