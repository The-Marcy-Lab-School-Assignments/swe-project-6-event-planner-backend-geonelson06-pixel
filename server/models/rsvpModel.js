const pool = require('../db/pool');

const createRSVP = async (user_id, event_id) => {
  const result = await pool.query(
    `INSERT INTO rsvps (user_id, event_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [user_id, event_id]
  );
  return result.rows[0] || null;
};

const deleteRSVP = async (user_id, event_id) => {
  const result = await pool.query(
    `DELETE FROM rsvps WHERE user_id=$1 AND event_id=$2 RETURNING *`,
    [user_id, event_id]
  );
  return result.rows[0] || null;
};

const getUserRSVPs = async (user_id) => {
  const result = await pool.query(`
    SELECT e.*, u.username, COUNT(r2.rsvp_id) AS rsvp_count
    FROM rsvps r
    JOIN events e ON r.event_id = e.event_id
    JOIN users u ON e.user_id = u.user_id
    LEFT JOIN rsvps r2 ON e.event_id = r2.event_id
    WHERE r.user_id = $1
    GROUP BY e.event_id, u.username
    ORDER BY e.date ASC
  `, [user_id]);

  return result.rows;
};

module.exports = { createRSVP, deleteRSVP, getUserRSVPs };