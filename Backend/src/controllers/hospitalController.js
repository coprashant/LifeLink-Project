const db = require('../config/db');

exports.submitBloodRequest = async (req, res) => {
    try {
        const { blood_group_needed, units_requested, urgency } = req.body;
        const hospitalId = req.session.hospitalId;
        
        if (!hospitalId) {
            return res.status(400).json({message: 'Hospital ID not found in session'});
        }
        
        const result = await db.query(
            'INSERT INTO Blood_Requests (blood_group_needed, units_requested, urgency, hospital_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [blood_group_needed, units_requested, urgency, hospitalId]
        );
        
        res.status(201).json({message: 'Blood request submitted successfully', data: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getMyRequests = async (req, res) => {
    try {
        const hospitalId = req.session.hospitalId;
        
        if (!hospitalId) {
            return res.status(400).json({message: 'Hospital ID not found in session'});
        }
        
        const result = await db.query(
            'SELECT * FROM Blood_Requests WHERE hospital_id = $1 ORDER BY request_date DESC',
            [hospitalId]
        );
        
        res.json({message: 'Requests retrieved successfully', data: result.rows});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getRequestDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalId = req.session.hospitalId;
        
        if (!hospitalId) {
            return res.status(400).json({message: 'Hospital ID not found in session'});
        }
        
        const result = await db.query(
            `SELECT br.*, 
                    (SELECT COUNT(*) FROM Request_Fulfillment WHERE request_id = br.request_id) as fulfilled_units
             FROM Blood_Requests br
             WHERE br.request_id = $1 AND br.hospital_id = $2`,
            [id, hospitalId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({message: 'Request not found'});
        }
        
        res.json({message: 'Request details retrieved successfully', data: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getAvailableBlood = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT blood_group, COUNT(*) as available_units
             FROM Blood_Inventory
             WHERE status = 'available' AND expiry_date > CURRENT_DATE
             GROUP BY blood_group
             ORDER BY blood_group`
        );
        
        res.json({message: 'Available blood retrieved successfully', data: result.rows});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};