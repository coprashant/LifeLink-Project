const express = require('express');
const session = require('express-session');
const cors = require('cors');   //Newly added for CORS support
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const donorRoutes = require('./routes/donorRoutes');

const app = express();

//Newly added for CORS support
app.use(cors({
    origin: 'http://localhost:5173', // React app's address
    credentials: true                // Allows cookies to be sent back and forth
}));           
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'thapathali_campus_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,        // Keep false for localhost
        httpOnly: true,       // Prevents JavaScript from stealing the cookie
        sameSite: 'lax'       // Helps with cross-origin requests on localhost
    }
}));

app.use('/api/auth', authRoutes);         
app.use('/api/admin', adminRoutes);       
app.use('/api/hospital', hospitalRoutes); 
app.use('/api/donor', donorRoutes);

//Run the server locally
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

module.exports = app;
