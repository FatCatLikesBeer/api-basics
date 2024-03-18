const express = require('express');
const router = express.Router();
const uuidv4  = require('uuid').v4;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davis',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '2',
  },
};

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
  };

  messages[id] = message;

  return res.send(message);
});


module.exports = router;
