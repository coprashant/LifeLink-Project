const db = require('../config/db');

exports.getProfile = async (req, res) => {
    try {
        const donorId = req.session.donorId;
        if (!donorId) return res.status(401).json({ message: 'Donor ID not found in session' });

        const result = await db.query(
            `SELECT *, 
                CASE 
                    WHEN last_donation_date IS NULL THEN 'Eligible'
                    WHEN (CURRENT_DATE - last_donation_date) >= 90 THEN 'Eligible'
                    ELSE 'Not Eligible'
                END as calculated_status,
                CASE 
                    WHEN last_donation_date IS NOT NULL THEN (CURRENT_DATE - last_donation_date)
                    ELSE 0
                END as days_diff
             FROM Donors 
             WHERE donor_id = $1`, 
            [donorId]
        );
        
        if (result.rows.length === 0) return res.status(404).json({ message: 'Donor profile not found' });

        const donor = result.rows[0];

        const historyResult = await db.query(
            `SELECT 
                history_id as donation_id, 
                donation_date as created_at, 
                quantity_ml || ' ml' as units, 
                'Completed' as status 
             FROM Donation_History 
             WHERE donor_id = $1 
             ORDER BY donation_date DESC`,
            [donorId]
        );

        res.json({
            full_name: donor.full_name,
            blood_group: donor.blood_group,
            contact_no: donor.contact_no,
            address: donor.address,
            lastDonation: donor.last_donation_date,
            status: donor.calculated_status, 
            daysSince: parseInt(donor.days_diff),
            history: historyResult.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Updated updateProfile to include donation history
exports.updateProfile = async (req, res) => {
    try {
        const donorId = req.session.donorId;
        const { full_name, contact_no, address, blood_group } = req.body;
        if (!donorId) return res.status(401).json({ message: 'Donor ID not found in session' });

        const result = await db.query(
            'UPDATE Donors SET full_name = $1, contact_no = $2, address = $3, blood_group = $4 WHERE donor_id = $5 RETURNING *',
            [full_name, contact_no, address, blood_group, donorId]
        );
        const donor = result.rows[0];

        res.json({
            full_name: donor.full_name,
            blood_group: donor.blood_group,
            contact_no: donor.contact_no,
            address: donor.address,
            lastDonation: donor.last_donation_date
        });
        // res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.checkEligibility = async (req, res) => {
    try {
        const donorId = req.session.donorId;

        if (!donorId) {
            return res.status(400).json({ message: 'Donor ID not found in session' });
        }

        const result = await db.query(
            `SELECT 
                donor_id,
                full_name,
                last_donation_date,
                CASE 
                    WHEN last_donation_date IS NULL THEN true
                    WHEN CURRENT_DATE - last_donation_date >= 90 THEN true
                    ELSE false
                END as is_eligible,
                CASE 
                    WHEN last_donation_date IS NULL THEN CURRENT_DATE
                    ELSE last_donation_date + INTERVAL '90 days'
                END as next_donation_date,
                CASE 
                    WHEN last_donation_date IS NOT NULL THEN CURRENT_DATE - last_donation_date
                    ELSE NULL
                END as days_since_last_donation
             FROM Donors
             WHERE donor_id = $1`,
            [donorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        res.json({ message: 'Eligibility check completed', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.searchBloodAvailability = async (req, res) => {
    try {
        const { bloodGroup } = req.params;

        const result = await db.query(
            `SELECT 
                blood_group,
                COUNT(*) as available_units,
                MIN(expiry_date) as earliest_expiry,
                MAX(expiry_date) as latest_expiry
             FROM Blood_Inventory
             WHERE blood_group = $1 
             AND status = 'available' 
             AND expiry_date > CURRENT_DATE
             GROUP BY blood_group`,
            [bloodGroup]
        );

        if (result.rows.length === 0) {
            return res.json({
                blood_group: bloodGroup,
                available_units: 0,
                message: 'No units available for this blood group'
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};