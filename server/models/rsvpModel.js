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

module.exports = { createRSVP, deleteRSVP };