const express = require('express');
const supabase = require('../../config/supabase');
const { sequelize } = require('../../models');
const db = require('../../models');

const { Op } = db.Sequelize;

const router = express.Router();
const Creators = db.creators;
const Promo = db.promo;

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
  const { page, s } = req.query;
  const offsetData = (page - 1) * 10;

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
  let randomNumber = 0;
  const numberOfPromo = await Promo.findAll({ where: { isPromoted: true } });
  randomNumber = Math.floor(Math.random() * numberOfPromo.length) + 1 - 4;
  console.log(randomNumber);
  const creatorsPromo = await Promo.findAll({
    where: { isPromoted: true },
    limit: 4,
    offest: 8
  });
  const promos = [];
  for (let i = 0; i < creatorsPromo.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const creator = await Creators.findOne({
      where: {
        username: creatorsPromo[i].username_of.trim(),
      },
      attributes: [
        'id',
        'username',
        'photos_count',
        [sequelize.json('profile_json.videosCount'), 'videosCount'],
        [sequelize.json('profile_json.postsCount'), 'postsCount'],
        [sequelize.json('profile_json.photosCount'), 'photosCount'],
        [sequelize.json('profile_json.avatarThumbs.c144'), 'avatarThumbs'],
        [sequelize.json('profile_json.header'), 'header'],
        [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
        [sequelize.json('profile_json.name'), 'name']],
    });
    promos.push(creator);
  }
  const CreatorsInfo = {
    status: 'success',
    data: promos
  };
  res.status(200).json(CreatorsInfo);
});

router.get('/location', async (req, res) => {
  const { page, l } = req.query;
  const offestData = (page - 1) * 10;
  const creators = await Creators.findAll({
    where: {
      'profile_json.avatar': {
        [Op.ne]: null,
      },
      'profile_json.location': {
        [Op.like]: `%${l}%`,
      },
    },
    limit: 10,
    offset: offestData,
    order: [['photos_count', 'DESC']],
    attributes: [
      'id',
      'username',
      'photos_count',
      [sequelize.json('profile_json.videosCount'), 'videosCount'],
      [sequelize.json('profile_json.postsCount'), 'postsCount'],
      [sequelize.json('profile_json.photosCount'), 'photosCount'],
      [sequelize.json('profile_json.avatarThumbs.c144'), 'avatarThumbs'],
      [sequelize.json('profile_json.header'), 'header'],
      [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
      [sequelize.json('profile_json.name'), 'name']],
  });
  if (creators.length === 0) {
    const creatorsPromo = await Promo.findAll({
      limit: 10,
      offest: offestData
    });
    const promos = [];
    for (let i = 0; i < creatorsPromo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const creator = await Creators.findOne({
        where: {
          username: creatorsPromo[i].username_of.trim(),
        },
        attributes: [
          'id',
          'username',
          'photos_count',
          [sequelize.json('profile_json.videosCount'), 'videosCount'],
          [sequelize.json('profile_json.postsCount'), 'postsCount'],
          [sequelize.json('profile_json.photosCount'), 'photosCount'],
          [sequelize.json('profile_json.avatarThumbs.c144'), 'avatarThumbs'],
          [sequelize.json('profile_json.header'), 'header'],
          [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
          [sequelize.json('profile_json.name'), 'name']],
      });
      promos.push(creator);
    }
    const CreatorsInfo = {
      status: 'success',
      data: creators
    };
    res.status(200).json(CreatorsInfo);
  }
  const CreatorsInfo = {
    status: 'success',
    data: creators
  };
  res.status(200).json(CreatorsInfo);
});

router.get('/freeprice', async (req, res) => {
  const { page } = req.query;
  const offestData = (page - 1) * 10;
  const creators = await Creators.findAll({
    where: {
      'profile_json.avatar': {
        [Op.ne]: null,
      },
      'profile_json.subscribePrice': {
        [Op.eq]: 0,
      },
    },
    limit: 10,
    offset: offestData,
    order: [['photos_count', 'DESC']],
    attributes: [
      'id',
      'username',
      'photos_count',
      [sequelize.json('profile_json.videosCount'), 'videosCount'],
      [sequelize.json('profile_json.postsCount'), 'postsCount'],
      [sequelize.json('profile_json.photosCount'), 'photosCount'],
      [sequelize.json('profile_json.avatarThumbs.c144'), 'avatarThumbs'],
      [sequelize.json('profile_json.header'), 'header'],
      [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
      [sequelize.json('profile_json.name'), 'name']],
  });
  const CreatorsInfo = {
    status: 'success',
    data: creators
  };
  res.status(200).json(CreatorsInfo);
});

router.get('/searchOne', async (req, res) => {
  const { s } = req.query;
  const offestData = 0;
  const creators = await Creators.findAll({
    where: {
      username: s,
      'profile_json.avatar': {
        [Op.ne]: null,
      }
    },
    limit: 10,
    offset: offestData,
    order: [['photos_count', 'DESC']],
    attributes: [
      'id',
      'username',
      'photos_count',
      [sequelize.json('profile_json.videosCount'), 'videosCount'],
      [sequelize.json('profile_json.postsCount'), 'postsCount'],
      [sequelize.json('profile_json.photosCount'), 'photosCount'],
      [sequelize.json('profile_json.avatarThumbs.c144'), 'avatarThumbs'],
      [sequelize.json('profile_json.avatar'), 'avatar'],
      [sequelize.json('profile_json.header'), 'header'],
      [sequelize.json('profile_json.location'), 'location'],
      [sequelize.json('profile_json.about'), 'about'],
      [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
      [sequelize.json('profile_json.name'), 'name']],
  });
  const CreatorsInfo = {
    status: 'success',
    data: creators
  };
  res.status(200).json(CreatorsInfo);
});
module.exports = router;
