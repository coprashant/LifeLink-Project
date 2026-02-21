const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect(['donor']));

// Donor Profile
router.get('/profile', donorController.getProfile);
router.put('/profile', donorController.updateProfile);

// Donation Centers & Appointments
router.get('/centers', donorController.getDonationCenters);
router.post('/appointments', donorController.bookAppointment);
router.get('/appointments', donorController.getUpcomingAppointments);
router.delete('/appointments/:id', donorController.cancelAppointment);

// Eligibility Checker
router.get('/eligibility', donorController.checkEligibility);

// Blood Availability Search
router.get('/search/:bloodGroup', donorController.searchBloodAvailability);

module.exports = router;