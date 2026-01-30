const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.handleLogin);
router.post('/register', authController.handleRegister);
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.send('Logged out successfully');
    });
});

module.exports = router;