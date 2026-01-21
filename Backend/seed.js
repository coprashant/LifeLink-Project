const db = require('./src/config/db');
const bcrypt = require('bcrypt');

async function seedUser() {
    const email = 'admin@lifelink.com';
    const plainPassword = 'password123';
    const role = 'admin'; 

    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        
        const query = 'INSERT INTO Users (email, password, role) VALUES ($1, $2, $3)';
        await db.query(query, [email, hashedPassword, role]);

        //Temporary log to confirm seeding
        console.log('Test Admin created successfully!');
        console.log('User: admin@lifelink.com | Pass: password123');
        process.exit();
    } catch (err) {
        console.error('Error seeding user:', err.message);
        process.exit(1);
    }
}

seedUser();