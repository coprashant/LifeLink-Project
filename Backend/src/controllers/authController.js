const db = require('../config/db');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.handleLogin = async (req, res) => {
    const { role, email, password } = req.body;
    
    try {
        const userQuery = 'SELECT * FROM Users WHERE email = $1 AND role = $2';
        const result = await db.query(userQuery, [email, role]);

        if (result.rows.length === 0) {
            return res.status(401).json({message: 'Invalid email or role.'}); 
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
    const { name, email, blood_group, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match.' }); 
    }

    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        const hashedPassword = await bcrypt.hash(password, 10);

        const donorResult = await client.query(
            'INSERT INTO Donors (full_name, blood_group, contact_no) VALUES ($1, $2, $3) RETURNING donor_id',
            [name, blood_group, 'Not Provided']
        );
        const donorId = donorResult.rows[0].donor_id;

        await client.query(
            "INSERT INTO Users (email, password, role, donor_id) VALUES ($1, $2, 'donor', $3)",
            [email, hashedPassword, donorId]
        );

        await client.query('COMMIT');

        res.status(201).json({ 
            success: true, 
            message: "Registration successful! You can now login." 
        });                                                          

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Error: Email might already be registered.' });   
    } finally {
        client.release();
    }
};

exports.getMe = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not logged in" });
    }

    try {
        // Query the DB using the ID saved in the session
        const result = await db.query('SELECT * FROM Users WHERE user_id = $1', [req.session.userId]);
        const user = result.rows[0];
        
        res.json({
            loggedIn: true,
            user: {
                id: user.user_id,
                role: user.role,
                donorId: user.donor_id,
                hospitalId: user.hospital_id
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};