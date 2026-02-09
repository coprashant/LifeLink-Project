const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect(['admin']));

// Donor Management
router.get('/donors', adminController.getAllDonors);
router.get('/donors/eligible', adminController.getEligibleDonors);
router.get('/donors/:id', adminController.getDonorById);
router.post('/donors', adminController.createDonor);
router.put('/donors/:id', adminController.updateDonor);
router.delete('/donors/:id', adminController.deleteDonor);

// Blood Inventory Management
router.get('/inventory', adminController.getInventory);
router.get('/inventory/alerts/expiring', adminController.getExpiringBags);
router.get('/inventory/:id', adminController.getInventoryById);
router.post('/inventory', adminController.addBloodBag);
router.put('/inventory/:id', adminController.updateBloodBag);
router.delete('/inventory/:id', adminController.deleteBloodBag);

// Blood Request Management
router.get('/requests', adminController.getAllRequests);
router.get('/requests/:id', adminController.getRequestById);
router.post('/requests/:id/allocate', adminController.allocateBloodToRequest);
router.put('/requests/:id/status', adminController.updateRequestStatus);

// Donation History
router.post('/donations', adminController.recordDonation);
router.get('/donations/:donorId', adminController.getDonationHistory);

module.exports = router;