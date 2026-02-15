const db = require('../config/db');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.handleLogin = async (req, res) => {
    const { role, email, password } = req.body;

    try {
        // We JOIN with Donors or Hospitals based on the role to get the actual name
        let userQuery = '';
        if (role === 'donor') {
            userQuery = `
                SELECT u.*, d.full_name as name 
                FROM Users u 
                LEFT JOIN Donors d ON u.donor_id = d.donor_id 
                WHERE u.email = $1 AND u.role = $2`;
        } else if (role === 'hospital') {
            userQuery = `
                SELECT u.*, h.hospital_name as name 
                FROM Users u 
                LEFT JOIN Hospitals h ON u.hospital_id = h.hospital_id 
                WHERE u.email = $1 AND u.role = $2`;
        } else {
            // Admin doesn't have a linked record, so we just select from Users
            userQuery = 'SELECT *, \'Admin\' as name FROM Users WHERE email = $1 AND role = $2';
        }

        const result = await db.query(userQuery, [email, role]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or role.' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.user_id;
            req.session.role = user.role;
            req.session.donorId = user.donor_id;
            req.session.hospitalId = user.hospital_id;

            return res.status(200).json({
                success: true,
                user: {
                    role: user.role,
                    name: user.name, 
                    donorId: user.donor_id,
                    hospitalId: user.hospital_id
                }
            });
        } else {
            res.status(401).json({ message: 'Incorrect password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.handleRegister = async (req, res) => {
    const { role, name, email, blood_group, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        const hashedPassword = await bcrypt.hash(password, 10);
        let donorId = null;
        let hospitalId = null;
 
        //update role 
        if (role === 'donor') {
            const donorResult = await client.query(
                'INSERT INTO Donors (full_name, blood_group, contact_no) VALUES ($1, $2, $3) RETURNING donor_id',
                [name, blood_group, 'Not Provided']
            );
            donorId = donorResult.rows[0].donor_id;
        } else if (role === 'hospital') {
            const hospitalResult = await client.query(
                'INSERT INTO Hospitals (hospital_name, hospital_email, location, contact) VALUES ($1, $2, $3, $4) RETURNING hospital_id',
                [name, email, 'Not Provided', 'Not Provided']
            );
            hospitalId = hospitalResult.rows[0].hospital_id;
        } else if (role === 'admin') {
            // Admin doesn't need a linked donor or hospital record
        } else {
            throw new Error('Invalid role specified');
        }

        await client.query(
            "INSERT INTO Users (email, password, role, donor_id, hospital_id) VALUES ($1, $2, $3, $4, $5)",
            [email, hashedPassword, role, donorId, hospitalId]
        );

        await client.query('COMMIT');

        res.status(201).json({
            success: true,
            message: "Registration successful! You can now login."
        });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Error: Email might already be registered or invalid data.' });
    } finally {
        client.release();
    }
};

exports.getMe = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not logged in" });
    }

    try {
        const { userId, role } = req.session;
        let query = '';

        // Match the logic used in handleLogin to fetch the name
        if (role === 'donor') {
            query = `
                SELECT u.user_id, u.role, u.donor_id, u.hospital_id, d.full_name as name 
                FROM Users u 
                LEFT JOIN Donors d ON u.donor_id = d.donor_id 
                WHERE u.user_id = $1`;
        } else if (role === 'hospital') {
            query = `
                SELECT u.user_id, u.role, u.donor_id, u.hospital_id, h.hospital_name as name 
                FROM Users u 
                LEFT JOIN Hospitals h ON u.hospital_id = h.hospital_id 
                WHERE u.user_id = $1`;
        } else {
            query = `SELECT user_id, role, donor_id, hospital_id, 'Admin' as name FROM Users WHERE user_id = $1`;
        }

        const result = await db.query(query, [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        res.json({
            loggedIn: true,
            user: {
                id: user.user_id,
                role: user.role,
                name: user.name, // Name is now correctly populated
                donorId: user.donor_id,
                hospitalId: user.hospital_id
            }
        });
    } catch (err) {
        console.error("getMe Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};