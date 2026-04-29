const pool = require('../db/pool');

const listEvents = async () => {
  const result = await pool.query(`
    SELECT e.*, u.username, COUNT(r.rsvp_id) AS rsvp_count
    FROM events e
    JOIN users u ON e.user_id = u.user_id
    LEFT JOIN rsvps r ON e.event_id = r.event_id
    GROUP BY e.event_id, u.username
    ORDER BY e.date ASC
  `);
  return result.rows;
};

const createEvent = async (data, user_id) => {
  const { title, description, date, location, event_type, max_capacity } = data;

  const result = await pool.query(
    `INSERT INTO events (title, description, date, location, event_type, max_capacity, user_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [title, description, date, location, event_type, max_capacity, user_id]
  );

  return result.rows[0];
};

const findEvent = async (id) => {
  const result = await pool.query(
    `SELECT * FROM events WHERE event_id=$1`,
    [id]
  );
  return result.rows[0];
};

const updateEvent = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const setString = keys.map((k, i) => `${k}=$${i + 1}`).join(", ");

  const result = await pool.query(
    `UPDATE events SET ${setString} WHERE event_id=$${keys.length + 1}
     RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

const deleteEvent = async (id) => {
  const result = await pool.query(
    `DELETE FROM events WHERE event_id=$1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = { listEvents, createEvent, findEvent, updateEvent, deleteEvent };