require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');

const auth = require('./controllers/authControllers');
const events = require('./controllers/eventControllers');
const rsvps = require('./controllers/rsvpControllers');
const users = require('./controllers/userControllers');

const checkAuth = require('./middleware/checkAuthentication');
const pathToFrontend = process.env.NODE_ENV === 'production' ? '../frontend/dist' : '../frontend';

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  httpOnly: true
}));

app.use(express.static(path.join(__dirname, pathToFrontend)));

// AUTH
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/auth/me', auth.me);
app.delete('/api/auth/logout', auth.logout);

// EVENTS
app.get('/api/events', events.list);
app.get('/api/users/:user_id/events', events.listByUser);
app.post('/api/events', checkAuth, events.create);
app.patch('/api/events/:event_id', checkAuth, events.update);
app.delete('/api/events/:event_id', checkAuth, events.remove);

// RSVPS
app.get('/api/users/:user_id/rsvps', rsvps.listUserRSVPs);
app.post('/api/events/:event_id/rsvps', checkAuth, rsvps.create);
app.delete('/api/events/:event_id/rsvps', checkAuth, rsvps.remove);

// USERS
app.patch('/api/users/:user_id', users.updatePassword);
app.delete('/api/users/:user_id', users.deleteUser);

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  res.sendFile(path.join(__dirname, pathToFrontend, 'index.html'));
});

const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};

app.use(handleError);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));