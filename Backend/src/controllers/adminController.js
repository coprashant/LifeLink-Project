const db = require('../config/db');

exports.getAllDonors = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Donors ORDER BY donor_id DESC');
    res.json({ message: 'Donors retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Donors WHERE donor_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createDonor = async (req, res) => {
  try {
    const { full_name, contact_no, address, blood_group } = req.body;

    const result = await db.query(
      'INSERT INTO Donors (full_name, contact_no, address, blood_group) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, contact_no, address, blood_group]
    );

    res.status(201).json({ message: 'Donor created successfully', donor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, contact_no, address, blood_group, last_donation_date } = req.body;

    const result = await db.query(
      'UPDATE Donors SET full_name = $1, contact_no = $2, address = $3, blood_group = $4, last_donation_date = $5 WHERE donor_id = $6 RETURNING *',
      [full_name, contact_no, address, blood_group, last_donation_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json({ message: 'Donor updated successfully', donor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM Donors WHERE donor_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json({ message: 'Donor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getEligibleDonors = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM eligible_donors');
    res.json({ message: 'Eligible donors retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Blood_Inventory ORDER BY collection_date DESC');
    res.json({ message: 'Inventory retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Blood_Inventory WHERE bag_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blood bag not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addBloodBag = async (req, res) => {
  try {
    const { blood_group, donor_id, units } = req.body;
    const numUnits = parseInt(units) || 1;
    const bags = [];

    for (let i = 0; i < numUnits; i++) {
      const result = await db.query(
        'INSERT INTO Blood_Inventory (blood_group, donor_id) VALUES ($1, $2) RETURNING *',
        [blood_group, donor_id]
      );
      bags.push(result.rows[0]);
    }

    res.status(201).json({
      message: `${numUnits} bags added successfully`,
      data: bags
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateBloodBag = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE Blood_Inventory SET status = $1 WHERE bag_id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blood bag not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteBloodBag = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM Blood_Inventory WHERE bag_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blood bag not found' });
    }

    res.json({ message: 'Blood bag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpiringBags = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM Blood_Inventory 
       WHERE status = 'available' 
       AND expiry_date <= CURRENT_DATE + INTERVAL '7 days'
       ORDER BY expiry_date ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT br.*, h.hospital_name, h.location 
       FROM Blood_Requests br
       JOIN Hospitals h ON br.hospital_id = h.hospital_id
       ORDER BY br.request_date DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT br.*, h.hospital_name, h.location 
       FROM Blood_Requests br
       JOIN Hospitals h ON br.hospital_id = h.hospital_id
       WHERE br.request_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.allocateBloodToRequest = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { id } = req.params;
    const { bag_ids } = req.body;

    await client.query('BEGIN');

    for (const bag_id of bag_ids) {
      await client.query(
        'INSERT INTO Request_Fulfillment (request_id, bag_id) VALUES ($1, $2)',
        [id, bag_id]
      );

      await client.query(
        `UPDATE Blood_Inventory SET status = 'reserved' WHERE bag_id = $1`,
        [bag_id]
      );
    }

    const fulfilledCount = await client.query(
      'SELECT COUNT(*) FROM Request_Fulfillment WHERE request_id = $1',
      [id]
    );

    const request = await client.query(
      'SELECT units_requested FROM Blood_Requests WHERE request_id = $1',
      [id]
    );

    const unitsRequested = request.rows[0].units_requested;
    const unitsFulfilled = parseInt(fulfilledCount.rows[0].count);

    let newStatus = 'pending';
    if (unitsFulfilled >= unitsRequested) {
      newStatus = 'fulfilled';
    } else if (unitsFulfilled > 0) {
      newStatus = 'partially_fulfilled';
    }

    await client.query(
      'UPDATE Blood_Requests SET status = $1 WHERE request_id = $2',
      [newStatus, id]
    );

    await client.query('COMMIT');
    res.json({ message: 'Blood allocated successfully', status: newStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    client.release();
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status !== 'fulfilled') {
    const result = await db.query(
      'UPDATE Blood_Requests SET status = $1 WHERE request_id = $2 RETURNING *',
      [status, id]
    );
    return res.json(result.rows[0]);
  }

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    const reqCheck = await client.query(
      'SELECT blood_group_needed, units_requested FROM Blood_Requests WHERE request_id = $1',
      [id]
    );
    const { blood_group_needed, units_requested } = reqCheck.rows[0];

    const invCheck = await client.query(
      'SELECT COUNT(*) FROM Blood_Inventory WHERE blood_group = $1 AND status = $2',
      [blood_group_needed, 'available']
    );

    if (parseInt(invCheck.rows[0].count) < units_requested) {
      throw new Error(`Insufficient inventory! Only ${invCheck.rows[0].count} units of ${blood_group_needed} available.`);
    }

    await client.query(`
      UPDATE Blood_Inventory 
      SET status = 'used' 
      WHERE bag_id IN (
        SELECT bag_id FROM Blood_Inventory 
        WHERE blood_group = $1 AND status = 'available' 
        LIMIT $2
      )`,
      [blood_group_needed, units_requested]
    );

    const finalReq = await client.query(
      'UPDATE Blood_Requests SET status = $1 WHERE request_id = $2 RETURNING *',
      ['fulfilled', id]
    );

    await client.query('COMMIT');
    res.json(finalReq.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ message: err.message });
  } finally {
    client.release();
  }
};

exports.recordDonation = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { donor_id, quantity_ml, health_remarks } = req.body;

    await client.query('BEGIN');

    const donation = await client.query(
      'INSERT INTO Donation_History (donor_id, quantity_ml, health_remarks) VALUES ($1, $2, $3) RETURNING *',
      [donor_id, quantity_ml, health_remarks]
    );

    await client.query(
      'UPDATE Donors SET last_donation_date = CURRENT_DATE WHERE donor_id = $1',
      [donor_id]
    );

    await client.query('COMMIT');
    res.status(201).json({ message: 'Donation recorded successfully', donation: donation.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    client.release();
  }
};

exports.getDonationHistory = async (req, res) => {
  try {
    const { donorId } = req.params;
    const result = await db.query(
      'SELECT * FROM Donation_History WHERE donor_id = $1 ORDER BY donation_date DESC',
      [donorId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        a.appointment_id, 
        d.full_name AS donor_name, 
        a.appointment_date, 
        a.appointment_time, 
        a.status,
        dc.center_name
      FROM Appointments a
      JOIN Donors d ON a.donor_id = d.donor_id
      JOIN Donation_Centers dc ON a.center_id = dc.center_id
      ORDER BY a.appointment_date DESC
    `);
    res.json({ message: 'Appointments retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Appointments WHERE appointment_id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { donor_id, center_id, appointment_date, appointment_time } = req.body;
    const result = await db.query(
      'INSERT INTO Appointments (donor_id, center_id, appointment_date, appointment_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [donor_id, center_id, appointment_date, appointment_time]
    );
    res.status(201).json({ message: 'Appointment created successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.query(
      'UPDATE Appointments SET status = $1 WHERE appointment_id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment updated successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM Appointments WHERE appointment_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};