const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userIdFromParams = Number(req.params.user_id);
    const sessionUserId = req.session.userId;

    // 401 — not logged in
    if (!sessionUserId) {
      return res.status(401).json(null);
    }

    // 403 — wrong user
    if (userIdFromParams !== sessionUserId) {
      return res.status(403).json(null);
    }

    // 400 — missing password
    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.updatePassword(sessionUserId, hash);

    // 404 — user not found
    if (!updatedUser) {
      return res.status(404).json(null);
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdFromParams = Number(req.params.user_id);
    const sessionUserId = req.session.userId;

    // 401 — not logged in
    if (!sessionUserId) {
      return res.status(401).json(null);
    }

    // 403 — wrong user
    if (userIdFromParams !== sessionUserId) {
      return res.status(403).json(null);
    }

    const deletedUser = await userModel.deleteUser(sessionUserId);

    // 404 — user not found
    if (!deletedUser) {
      return res.status(404).json(null);
    }

    // destroy session after delete
    req.session = null;

    res.json(deletedUser);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { updatePassword, deleteUser };