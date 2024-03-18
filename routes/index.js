const express = require('express');
const router = express.Router();
const uuidv4  = require('uuid').v4;
const { users, messages } = require('../models/index.js')

router.use((req, res, next) => {
  req.me = users[1];
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res) => {
  res.send(Object.values(users));
});

router.get('/users/:userId', (req, res) => {
  res.send(users[req.params.userId]);
});

router.get('/messages', (req, res) => {
  res.send(Object.values(messages));
});

router.get('/messages/:messageId', (req, res) => {
  res.send(messages[req.params.messageId]);
});

router.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

router.delete('/messages/:messageId', (req, res, next) => {
  const {
  [req.params.messageId]: message,
  ...otherMessages
} = messages;

messages = otherMessages;

return res.send(message);
});

router.get('/session', (req, res) => {
  res.send(users[req.me.id]);
})

module.exports = router;
