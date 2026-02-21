-- Donors Table: Stores personal info and donation eligibility
CREATE TABLE Donors (
    donor_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    address TEXT,
    last_donation_date DATE,
    blood_group VARCHAR(5) NOT NULL 
);

-- Hospitals Table: Stores hospital details for blood requests
CREATE TABLE Hospitals (
    hospital_id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    hospital_email VARCHAR(100) UNIQUE NOT NULL
);

-- Users Table: Handles authentication and links to donor or hospital profiles
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'hospital', 'donor')),
    donor_id INT REFERENCES Donors(donor_id) ON DELETE CASCADE,
    hospital_id INT REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- Donation History: Logs every successful donation event
CREATE TABLE Donation_History (
    history_id SERIAL PRIMARY KEY,
    donation_date DATE DEFAULT CURRENT_DATE,
    quantity_ml INT DEFAULT 450,
    health_remarks TEXT,
    donor_id INT NOT NULL REFERENCES Donors(donor_id) ON DELETE CASCADE
);

-- Blood Inventory: Tracks individual blood bags and their expiry
CREATE TABLE Blood_Inventory (
    bag_id SERIAL PRIMARY KEY,
    blood_group VARCHAR(5) NOT NULL,
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + 42),
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'used', 'expired')),
    donor_id INT REFERENCES Donors(donor_id) ON DELETE SET NULL
);

-- Blood Requests: Records blood requirements submitted by hospitals
CREATE TABLE Blood_Requests (
    request_id SERIAL PRIMARY KEY,
    blood_group_needed VARCHAR(5) NOT NULL,
    units_requested INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    urgency VARCHAR(20) DEFAULT 'Normal' CHECK (urgency IN ('Normal', 'Urgent', 'Critical')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partially_fulfilled', 'fulfilled', 'cancelled')),
    hospital_id INT NOT NULL REFERENCES Hospitals(hospital_id) ON DELETE CASCADE
);

-- Request Fulfillment: Links specific blood bags to hospital requests
CREATE TABLE Request_Fulfillment (
    fulfillment_id SERIAL PRIMARY KEY, 
    request_id INT NOT NULL REFERENCES Blood_Requests(request_id) ON DELETE CASCADE,
    bag_id INT NOT NULL REFERENCES Blood_Inventory(bag_id) ON DELETE CASCADE,
    fulfillment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donation Centers: Geo-location data for donation sites
CREATE TABLE Donation_Centers (
    center_id SERIAL PRIMARY KEY,
    center_name VARCHAR(150) NOT NULL,
    location_lat DECIMAL(9,6) NOT NULL, 
    location_lng DECIMAL(9,6) NOT NULL, 
    address TEXT,
    contact_no VARCHAR(15),
    operating_hours VARCHAR(100) DEFAULT '9:00 AM - 5:00 PM'
);

-- Appointments: Schedules between donors and centers
CREATE TABLE Appointments (
    appointment_id SERIAL PRIMARY KEY,
    donor_id INT NOT NULL REFERENCES Donors(donor_id) ON DELETE CASCADE,
    center_id INT NOT NULL REFERENCES Donation_Centers(center_id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Eligible Donors View: Filters donors who haven't donated in the last 90 days
CREATE OR REPLACE VIEW eligible_donors AS
SELECT 
    donor_id, 
    full_name, 
    blood_group, 
    last_donation_date
FROM Donors
WHERE last_donation_date IS NULL OR (CURRENT_DATE - last_donation_date) >= 90;