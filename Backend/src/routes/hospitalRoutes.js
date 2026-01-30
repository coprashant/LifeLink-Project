const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect(['hospital']));

// Blood Request Operations
router.post('/requests', hospitalController.submitBloodRequest);
router.get('/requests', hospitalController.getMyRequests);
router.get('/requests/:id', hospitalController.getRequestDetails);

// Inventory View (Read-Only)
router.get('/inventory/available', hospitalController.getAvailableBlood);

module.exports = router;