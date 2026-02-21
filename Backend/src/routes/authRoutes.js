const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/me', authController.getMe);

router.post('/login', authController.handleLogin);
router.post('/register', authController.handleRegister);

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;