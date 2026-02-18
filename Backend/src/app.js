const express = require('express');
const session = require('express-session');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const donorRoutes = require('./routes/donorRoutes');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
    origin: isProduction ? process.env.FRONTEND_URL : 'http://localhost:5173', 
    credentials: true                
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'thapathali_campus_key',
    resave: false,
    saveUninitialized: false,
    proxy: isProduction, 
    cookie: {
        secure: isProduction, 
        httpOnly: true,       
        sameSite: isProduction ? 'none' : 'lax' 
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/donor', donorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const host = isProduction ? 'Cloud Environment' : `http://localhost:${PORT}`;
    console.log(`Server running in ${isProduction ? 'production' : 'development'} mode on ${host}`);
});

module.exports = app;