const db = require('../config/db');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.handleLogin = async (req, res) => {
    const { role, email, password } = req.body;
    
    try {
        const userQuery = 'SELECT * FROM Users WHERE email = $1 AND role = $2';
        const result = await db.query(userQuery, [email, role]);

        if (result.rows.length === 0) {
            return res.status(401).send('Invalid email or role.');
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.user_id;
            req.session.role = user.role;

            let rootPath = process.cwd();
            if (rootPath.endsWith('Backend')) {
                rootPath = path.join(rootPath, '..');
            }
            
            const htmlFolder = path.join(rootPath, 'Frontend/HTML');
            
            if (user.role === 'admin') {
                return res.sendFile(path.join(htmlFolder, 'adminDashboard.html'));
            }
            
            if (user.role === 'donor' && user.donor_id) {
                req.session.donorId = user.donor_id;
                return res.sendFile(path.join(htmlFolder, 'DonorDashboard.html'));
            }
            
            if (user.role === 'hospital' && user.hospital_id) {
                req.session.hospitalId = user.hospital_id;
                return res.sendFile(path.join(htmlFolder, 'hospitalDashboard.html'));
            }
            
            res.send('Login Successful');
        } else {
            res.status(401).send('Incorrect password.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.handleRegister = async (req, res) => {
    const { name, email, blood_group, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match.');
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
        res.send("Registration successful! <a href='/login.html'>Login here</a>");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Registration Error:', err);
        res.status(500).send('Error: Email might already be registered.');
    } finally {
        client.release();
    }
};