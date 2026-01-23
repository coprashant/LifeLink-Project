const express = require('express');
const session = require('express-session');
const path = require('path');
const frontendPath = path.join(__dirname, '../../Frontend');
require('dotenv').config();

//Import the routes
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

//Use the routes
app.use('/', authRoutes); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/HTML/home.html')); 
});
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/HTML/register.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/HTML/login.html'));
});
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/HTML/home.html'));
});

module.exports = app;

//Run the server locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
