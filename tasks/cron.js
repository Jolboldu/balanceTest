const cron = require('node-cron');
const tasks = require('./tasks')
const amqp = require('amqplib');

(async () => {
  const isWriteNode = process.env.WRITE
  if(isWriteNode){
    const connection = await amqp.connect('amqp://your_user:your_password@localhost');
    const channel = await connection.createChannel();
  
    // Schedule all tasks
    tasks.data.forEach((task, index) => {
      cron.schedule(task.interval, async () => {
        const message = { data: { name: task.name, time: new Date()} };
        
        try {
      
          channel.publish('', 'tasks', Buffer.from(JSON.stringify(message)));
          console.log(`Publishing:(${message}) from write node`);

        } catch (error) {
          console.error('Error:', error.message);
          process.exit(1);
        }
      });
    });
  }
  
})();


