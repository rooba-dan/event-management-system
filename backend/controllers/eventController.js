const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');
const { sendEventNotification } = require('../utils/mailer');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.attendees?.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already RSVP\'d to this event' });
    }
    event.attendees = event.attendees || [];
    event.attendees.push(req.user.id);
    console.log('email backend', req.user);
    await event.save();
    await sendEventNotification(req.user.email, event);
    res.json({ message: 'RSVP successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
