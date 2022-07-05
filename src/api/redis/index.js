const express = require('express');
const { getCached } = require('../../middleware/redis');
const { sequelize } = require('../../models');
const db = require('../../models');

const { Op } = db.Sequelize;

const router = express.Router();
const Creators = db.creators;

router.get('/', getCached, async (req, res) => {
  const { page } = req.query;
  const offestData = (page - 1) * 10;
  const creators = await Creators.findAll({
    where: {
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
      [sequelize.json('profile_json.header'), 'header'],
      [sequelize.json('profile_json.subscribePrice'), 'subscribePrice'],
      [sequelize.json('profile_json.name'), 'name']],
  });
  const CreatorsInfo = {
    status: 'success',
    creators
  };
  res.status(200).json(CreatorsInfo);
});

exports.default = router;