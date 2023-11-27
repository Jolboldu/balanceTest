const { Task } = require('../models')
const tasks = require('./tasks');
const redis = require('../redis');

async function getTasksStatus() {
  const redisClient = await redis.getRedisClient()
  const tasksInfo = [];
  for(const element of tasks.data) {
    const task = await redisClient.get(element.name);
    if(task){
      const data = JSON.parse(task)
      const timeSpent = Date.now() - data.date;
      tasksInfo.push({ name: data.name, timeSpent, nodeID: data.nodeID })
    }
    else  tasksInfo.push({ name: element.name, date: null, nodeID: null})
  }
  return tasksInfo;
}

async function saveTask(name) {
  try {
    await Task.create({ name });
  } catch (error) {
    throw new Error('trying to save task');
  }
}


module.exports = {
    getTasksStatus,
    saveTask
}
