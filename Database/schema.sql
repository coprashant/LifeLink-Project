-- 1. Create custom types for restricted fields
CREATE TYPE user_role AS ENUM ('Admin', 'Hospital', 'Donor');
CREATE TYPE blood_status AS ENUM ('available', 'reserved', 'used', 'expired');
CREATE TYPE request_urgency AS ENUM ('Normal', 'Urgent', 'Critical');
CREATE TYPE request_status AS ENUM ('pending', 'partially_fulfilled', 'fulfilled', 'cancelled');

-- 2. Donors Table
CREATE TABLE Donors (
    donor_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    address TEXT,
    last_donation_date DATE,
    blood_group VARCHAR(5) NOT NULL -- Added for quick lookups
);

-- 3. Hospitals Table
CREATE TABLE Hospitals (
    hospital_id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    hospital_email VARCHAR(100) UNIQUE NOT NULL
);

-- 4. Users Table (Linking to Donors or Hospitals)
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- To be hashed in Node.js
    role user_role NOT NULL,
    donor_id INT REFERENCES Donors(donor_id) ON DELETE CASCADE,
    hospital_id INT REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- 5. Donation History (Tracking over time)
CREATE TABLE Donation_History (
    history_id SERIAL PRIMARY KEY,
    donation_date DATE DEFAULT CURRENT_DATE,
    quantity_ml INT DEFAULT 450,
    health_remarks TEXT,
    donor_id INT NOT NULL REFERENCES Donors(donor_id) ON DELETE CASCADE
);

-- 6. Blood Inventory (Individual bags)
CREATE TABLE Blood_Inventory (
    bag_id SERIAL PRIMARY KEY,
    blood_group VARCHAR(5) NOT NULL,
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    -- Business Logic: Automatic 42-day shelf life
    expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '42 days'),
    status blood_status DEFAULT 'available',
    donor_id INT REFERENCES Donors(donor_id) ON DELETE SET NULL
);

-- 7. Blood Requests (From Hospitals)
CREATE TABLE Blood_Requests (
    request_id SERIAL PRIMARY KEY,
    blood_group_needed VARCHAR(5) NOT NULL,
    units_requested INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urgency request_urgency DEFAULT 'Normal',
    status request_status DEFAULT 'pending',
    hospital_id INT NOT NULL REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- 8. Request Fulfillment (Bridge Table)
CREATE TABLE Request_Fulfillment (
    fulfillment_id SERIAL PRIMARY KEY, -- Simplifies management over a composite key
    request_id INT NOT NULL REFERENCES Blood_Requests(request_id) ON DELETE CASCADE,
    bag_id INT NOT NULL REFERENCES Blood_Inventory(bag_id) ON DELETE CASCADE,
    fulfillment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a view to quickly see who can donate today
CREATE OR REPLACE VIEW eligible_donors AS
SELECT 
    donor_id, 
    full_name, 
    blood_group,
    last_donation_date,
    (CURRENT_DATE - last_donation_date) AS days_since_last_donation
FROM Donors
WHERE last_donation_date IS NULL -- Never donated before
   OR (CURRENT_DATE - last_donation_date) >= 90;