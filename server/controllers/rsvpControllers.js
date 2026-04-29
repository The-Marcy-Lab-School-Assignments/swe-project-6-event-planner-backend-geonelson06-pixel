const rsvpModel = require('../models/rsvpModel');

const create = async (req, res) => {
  const rsvp = await rsvpModel.createRSVP(req.session.userId, req.params.event_id);
  res.status(201).json(rsvp);
};

const remove = async (req, res) => {
  const rsvp = await rsvpModel.deleteRSVP(req.session.userId, req.params.event_id);
  res.json(rsvp);
};

module.exports = { create, remove };