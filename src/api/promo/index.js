const express = require('express');
const supabase = require('../../config/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data: promo } = await supabase.from('promo').select('*');

    const dataJSON = {
      status: 'success',
      data: promo
    };
    return res.status(200).json(dataJSON);
  } catch (error) {
    const errorJSON = {
      status: 'error',
      message: error.message
    };
    res.status(500).json(errorJSON);
  }
});

module.exports = router;
