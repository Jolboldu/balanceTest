const amqp = require('amqplib');
const nodeIndex = process.env.INDEX || 0;
const redis = require('../redis');
const tasks = require('./tasks');
const service = require('./service');

async function subscribe() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://your_user:your_password@localhost');
    const channel = await connection.createChannel();
    const redisClient = await redis.getRedisClient()

    const { queue } = await channel.assertQueue('tasks', { exclusive: false });

    // Consume messages from the queue
    channel.consume(queue, async (msg) => {
      if (msg.content) {        
        const message = msg.content.toString();
        const data = JSON.parse(message).data;
        const redisValue = JSON.stringify({nodeID: nodeIndex, date: Date.now(), name: data.name})
        await redisClient.set(data.name, redisValue)
        console.log(`Node number:(${nodeIndex}) Received message ${data.name}`);
        const task = tasks.data.find((element)=> element.name == data.name);
        await task.execute();
        await service.saveTask(task.name);
        await redisClient.del(data.name);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

subscribe();


module.exports = {
    data: tasks
}