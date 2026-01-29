const db = require('../config/db'); 
const bcrypt = require('bcryptjs');

exports.handleLogin = async (req, res) => {
    const { role, email, password } = req.body;
    console.log(`Login attempt: ${email} as ${role}`);
    try {
        const userQuery = 'SELECT * FROM Users WHERE email = $1 AND role = $2';
        const result = await db.query(userQuery, [email, role]);

        if (result.rows.length === 0) {
            console.log("User not found in database.");
            return res.status(401).send('Invalid email or role.');
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.user_id;
            req.session.role = user.role;
            // REDirection logic based on role
            if (user.role === 'admin') {
                return res.redirect('/admin/dashboard.html');
            } else if (user.role === 'hospital') {
                return res.redirect('/hospital/portal.html');
            } else {
                return res.redirect('/home.html'); // For donors
            }
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

    // 1. Basic Validation
    if (password !== confirm_password) {
        return res.status(400).send("Passwords do not match.");
    }

    // Use a client from the pool for the transaction
    const client = await db.pool.connect(); 

    try {
        await client.query('BEGIN');

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert into Donors Table 
        const donorResult = await client.query(
            'INSERT INTO Donors (full_name, blood_group, contact_no) VALUES ($1, $2, $3) RETURNING donor_id',
            [name, blood_group, 'Not Provided']
        );
        const donorId = donorResult.rows[0].donor_id;

        // 4. Insert into Users Table
        await client.query(
            "INSERT INTO Users (email, password, role, donor_id) VALUES ($1, $2, 'donor', $3)",
            [email, hashedPassword, donorId]
        );

        await client.query('COMMIT');
        res.send("Registration successful! <a href='/login.html'>Login here</a>");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Registration Error:', err);
        console.error(err.message);
        res.status(500).send("Error: Email might already be registered.");
    } finally {
        client.release();
    }
};