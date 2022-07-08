const express = require('express');

const emojis = require('./emojis');
const creators = require('./creators');
const form = require('./form');
const promo = require('./promo');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/creators', creators);
router.use('/form', form);
router.use('/promo', promo);
module.exports = router;
