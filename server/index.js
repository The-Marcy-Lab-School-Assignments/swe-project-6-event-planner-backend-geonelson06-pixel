require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');

const auth = require('./controllers/authControllers');
const events = require('./controllers/eventControllers');
const rsvps = require('./controllers/rsvpControllers');
const users = require('./controllers/userControllers');

const checkAuth = require('./middleware/checkAuthentication');

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  httpOnly: true
}));

app.use(express.static(path.join(__dirname, '../frontend')));

// AUTH
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/auth/me', auth.me);
app.delete('/api/auth/logout', auth.logout);

// EVENTS
app.get('/api/events', events.list);
app.post('/api/events', checkAuth, events.create);
app.patch('/api/events/:event_id', checkAuth, events.update);
app.delete('/api/events/:event_id', checkAuth, events.remove);

// RSVPS
app.post('/api/events/:event_id/rsvps', checkAuth, rsvps.create);
app.delete('/api/events/:event_id/rsvps', checkAuth, rsvps.remove);

// USERS
app.patch('/api/users/:user_id', users.updatePassword);
app.delete('/api/users/:user_id', users.deleteUser);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(8080, () => console.log("Server running on 8080"));