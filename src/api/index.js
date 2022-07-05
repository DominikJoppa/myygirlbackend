const express = require('express');

const emojis = require('./emojis');
const creators = require('./creators');
const redis = require('./redis');
const form = require('./form');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/creators', creators);
router.use('/form', form);
module.exports = router;
