const express = require('express');
const supabase = require('../../config/supabase');
const Promo = require('../../utils/promo');

const router = express.Router();

router.get('/', async (req, res) => {
  const { page } = req.query;
  const offsetData = (page - 1) * 10;

  const { data: creators } = await supabase
    .from('creators')
    .select('id, username, photosCount, videosCount, postsCount, avatar, subscribePrice, name')
    .not('avatar', 'eq', 'null')
    .limit(10)
    .order('photosCount', { ascending: false })
    .range(offsetData, offsetData + 10);

  const CreatorsInfo = {
    status: 'success',
    data: creators
  };

  res.status(200).json(CreatorsInfo);
});

router.get('/search', async (req, res) => {
  const { s } = req.query;

  const { data: creators } = await supabase
    .from('creators')
    .select()
    .textSearch('fts', s);

  const CreatorsInfo = {
    status: 'success',
    data: creators
  };

  res.status(200).json(CreatorsInfo);
});

router.get('/promo', async (req, res) => {
  const creatorsPromo = await Promo();

  const CreatorsInfo = {
    status: 'success',
    data: creatorsPromo
  };

  res.status(200).json(CreatorsInfo);
});

router.get('/location', async (req, res) => {
  const { page, l } = req.query;
  const offsetData = (page - 1) * 10;

  const { data: creators } = await supabase
    .from('creators')
    .select('id, username, photosCount, videosCount, postsCount, avatar, subscribePrice, name, location')
    .like('location', `%${l}%`)
    .not('avatar', 'eq', 'null')
    .limit(10)
    .order('photosCount', { ascending: false })
    .range(offsetData, offsetData + 10);

  const creatorsPromo = await Promo();

  for (let i = 0; i < creatorsPromo.length; i += 1) {
    const randomPosition = Math.floor(Math.random() * creators.length);
    creators.splice(randomPosition, 0, creatorsPromo[i]);
  }

  const CreatorsInfo = {
    status: 'success',
    data: creators
  };
  res.status(200).json(CreatorsInfo);
});

router.get('/freeprice', async (req, res) => {
  const { page } = req.query;
  const offsetData = (page - 1) * 10;

  const { data: creators } = await supabase
    .from('creators')
    .select('id, username, photosCount, videosCount, postsCount, avatar, subscribePrice, name')
    .not('subscribePrice', 'gt', '0')
    .not('avatar', 'eq', 'null')
    .limit(10)
    .order('photosCount', { ascending: false })
    .range(offsetData, offsetData + 10);

  const creatorsPromo = await Promo();

  for (let i = 0; i < creatorsPromo.length; i += 1) {
    const randomPosition = Math.floor(Math.random() * creators.length);
    creators.splice(randomPosition, 0, creatorsPromo[i]);
  }

  const CreatorsInfo = {
    status: 'success',
    data: creators
  };

  res.status(200).json(CreatorsInfo);
});

router.get('/searchOne', async (req, res) => {
  const { s } = req.query;
  const offsetData = 0;

  const { data: creators } = await supabase
    .from('creators')
    .select('id, username, photosCount, videosCount, postsCount, avatar, subscribePrice, name')
    .eq('username', `${s}`)
    .not('avatar', 'eq', 'null')
    .limit(10)
    .order('photosCount', { ascending: false })
    .range(offsetData, offsetData + 10);

  const CreatorsInfo = {
    status: 'success',
    data: creators
  };

  res.status(200).json(CreatorsInfo);
});

module.exports = router;
