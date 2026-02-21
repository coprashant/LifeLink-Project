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

exports.checkEligibility = async (req, res) => {
  try {
    const donorId = req.session.donorId;
    if (!donorId) return res.status(401).json({ message: 'Donor ID not found' });

    const result = await db.query(
      `SELECT 
          donor_id,
          CASE 
            WHEN last_donation_date IS NULL THEN true
            WHEN CURRENT_DATE - last_donation_date >= 90 THEN true
            ELSE false
          END as is_eligible,
          CASE 
            WHEN last_donation_date IS NULL THEN CURRENT_DATE
            ELSE last_donation_date + INTERVAL '90 days'
          END as next_donation_date
       FROM Donors WHERE donor_id = $1`,
      [donorId]
    );
    res.json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.searchBloodAvailability = async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const result = await db.query(
      `SELECT blood_group, COUNT(*) as available_units
       FROM Blood_Inventory
       WHERE blood_group = $1 AND status = 'available' AND expiry_date > CURRENT_DATE
       GROUP BY blood_group`,
      [bloodGroup]
    );
    res.json(result.rows[0] || { blood_group: bloodGroup, available_units: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { center_id, appointment_date, appointment_time } = req.body;
    const donorId = req.session.donorId;

    if (!donorId) {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    const result = await db.query(
      `INSERT INTO Appointments (donor_id, center_id, appointment_date, appointment_time, status) 
       VALUES ($1, $2, $3, $4, 'scheduled') RETURNING *`,
      [donorId, center_id, appointment_date, appointment_time]
    );

    res.status(201).json({
      message: "Appointment scheduled!",
      appointment: result.rows[0]
    });
  } catch (err) {
    console.error("Booking Error:", err.message);
    res.status(500).json({ error: "Booking failed" });
  }
};

exports.getUpcomingAppointments = async (req, res) => {
  try {
    const donorId = req.session.donorId;
    if (!donorId) return res.status(401).json({ message: 'Session expired' });

    const result = await db.query(
      `SELECT a.appointment_id, a.appointment_date, a.appointment_time, a.status, c.center_name 
       FROM Appointments a
       JOIN Donation_Centers c ON a.center_id = c.center_id
       WHERE a.donor_id = $1 AND a.status = 'scheduled'
       ORDER BY a.appointment_date ASC`,
      [donorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const donorId = req.session.donorId;

    if (!donorId) return res.status(401).json({ message: 'Session expired' });

    await db.query(
      "DELETE FROM Appointments WHERE appointment_id = $1 AND donor_id = $2",
      [id, donorId]
    );
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cancellation failed" });
  }
};

exports.getDonationCenters = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Donation_Centers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch centers" });
  }
};