-- 1. Donors Table
CREATE TABLE Donors (
    donor_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    address TEXT,
    last_donation_date DATE,
    blood_group VARCHAR(5) NOT NULL 
);

-- 2. Hospitals Table
CREATE TABLE Hospitals (
    hospital_id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    hospital_email VARCHAR(100) UNIQUE NOT NULL
);

-- 3. Users Table 
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'hospital', 'donor')),
    donor_id INT REFERENCES Donors(donor_id) ON DELETE CASCADE,
    hospital_id INT REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- 4. Donation History 
CREATE TABLE Donation_History (
    history_id SERIAL PRIMARY KEY,
    donation_date DATE DEFAULT CURRENT_DATE,
    quantity_ml INT DEFAULT 450,
    health_remarks TEXT,
    donor_id INT NOT NULL REFERENCES Donors(donor_id) ON DELETE CASCADE
);

-- 5. Blood Inventory 
CREATE TABLE Blood_Inventory (
    bag_id SERIAL PRIMARY KEY,
    blood_group VARCHAR(5) NOT NULL,
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '42 days'),
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'used', 'expired')),
    donor_id INT REFERENCES Donors(donor_id) ON DELETE SET NULL
);

-- 6. Blood Requests (From Hospitals)
CREATE TABLE Blood_Requests (
    request_id SERIAL PRIMARY KEY,
    blood_group_needed VARCHAR(5) NOT NULL,
    units_requested INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urgency VARCHAR(20) DEFAULT 'Normal' CHECK (urgency IN ('Normal', 'Urgent', 'Critical')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partially_fulfilled', 'fulfilled', 'cancelled')),
    hospital_id INT NOT NULL REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- 7. Request Fulfillment 
CREATE TABLE Request_Fulfillment (
    fulfillment_id SERIAL PRIMARY KEY, 
    request_id INT NOT NULL REFERENCES Blood_Requests(request_id) ON DELETE CASCADE,
    bag_id INT NOT NULL REFERENCES Blood_Inventory(bag_id) ON DELETE CASCADE,
    fulfillment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Eligible Donors View
CREATE OR REPLACE VIEW eligible_donors AS
SELECT 
    donor_id, 
    full_name, 
    blood_group,
    last_donation_date,
    (CURRENT_DATE - last_donation_date) AS days_since_last_donation
FROM Donors
WHERE last_donation_date IS NULL 
   OR (CURRENT_DATE - last_donation_date) >= 90;

SELECT * FROM Users;