const redis = require('redis');
let clientInstance = null;

async function getRedisClient() {
  if (!clientInstance) {
    clientInstance = await redis.createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
  }

  return clientInstance;
}

module.exports = {
  getRedisClient,
};
