const rsvpModel = require('../models/rsvpModel');

const create = async (req, res) => {
  const rsvp = await rsvpModel.createRSVP(req.session.userId, req.params.event_id);
  res.status(201).json(rsvp);
};

const remove = async (req, res) => {
  const rsvp = await rsvpModel.deleteRSVP(req.session.userId, req.params.event_id);
  res.json(rsvp);
};

const listUserRSVPs = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);

    const events = await rsvpModel.getUserRSVPs(user_id);

    res.json(events);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { create, remove, listUserRSVPs };