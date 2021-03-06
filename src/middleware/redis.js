const redis = require('redis');

const redis_url = process.env.REDIS_URL || null;
const client = redis.createClient(redis_url);

module.exports = {
  getCached: async (req, res, next) => {
    await client.connect();
    const { redis_key } = req.headers;
    client.get(redis_key, (err, reply) => {
      if (err) {
        res.status(500).json({
          message: 'Somethin Went Wrong'
        });
      }
      if (reply == null) {
        next();
      } else {
        res.status(200).json({
          message: `Success Read ${redis_key}`,
          data: JSON.parse(reply)
        });
      }
    });
  },
  caching: (key, data) => {
    client.set(key, JSON.stringify(data));
  },
  delCache: (key) => {
    client.del(key);
  }
};
