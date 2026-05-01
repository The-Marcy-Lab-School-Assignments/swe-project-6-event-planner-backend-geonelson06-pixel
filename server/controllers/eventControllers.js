const eventModel = require('../models/eventModel');

const list = async (req, res) => {
  const events = await eventModel.listEvents();
  res.json(events);
};

const listByUser = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);

    const events = await eventModel.getUserEvents(user_id);

    res.json(events);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const create = async (req, res) => {
  const event = await eventModel.createEvent(req.body, req.session.userId);
  res.status(201).json(event);
};

const update = async (req, res) => {
  const event = await eventModel.findEvent(req.params.event_id);

  if (!event) return res.status(404).json(null);
  if (event.user_id !== req.session.userId) return res.status(403).json(null);

  const updated = await eventModel.updateEvent(req.params.event_id, req.body);
  res.json(updated);
};

const remove = async (req, res) => {
  const event = await eventModel.findEvent(req.params.event_id);

  if (!event) return res.status(404).json(null);
  if (event.user_id !== req.session.userId) return res.status(403).json(null);

  const deleted = await eventModel.deleteEvent(req.params.event_id);
  res.json(deleted);
};

module.exports = { list, listByUser, create, update, remove };