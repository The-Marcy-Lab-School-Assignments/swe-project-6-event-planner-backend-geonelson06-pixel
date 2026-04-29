const pool = require('../db/pool');

const createUser = async (username, hash) => {
  const result = await pool.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     RETURNING user_id, username`,
    [username, hash]
  );
  return result.rows[0];
};

const findByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username=$1`,
    [username]
  );
  return result.rows[0];
};

const updatePassword = async (user_id, hash) => {
  const result = await pool.query(
    `UPDATE users SET password_hash=$1 WHERE user_id=$2
     RETURNING user_id, username`,
    [hash, user_id]
  );
  return result.rows[0];
};

const deleteUser = async (user_id) => {
  const result = await pool.query(
    `DELETE FROM users WHERE user_id=$1 RETURNING user_id, username`,
    [user_id]
  );
  return result.rows[0];
};

module.exports = { createUser, findByUsername, updatePassword, deleteUser };