const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Missing" });

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(username, hash);

    req.session.userId = user.user_id;
    res.status(201).json(user);

  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: "Taken" });
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findByUsername(username);
  if (!user) return res.status(401).json({ error: "Invalid" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid" });

  req.session.userId = user.user_id;
  res.json({ user_id: user.user_id, username: user.username });
};

const me = (req, res) => {
  if (!req.session.userId) return res.status(401).json(null);
  res.json({ user_id: req.session.userId });
};

const logout = (req, res) => {
  req.session = null;
  res.json({ message: "Logged out" });
};

module.exports = { register, login, me, logout };