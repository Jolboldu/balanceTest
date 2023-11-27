# balanceTest

Тестовое задание номер один https://docs.google.com/document/d/17Ao_opzaQ-mjYdUYeCcfBU6BU6NK4TTe/edit

Как запустить:

  a) npm install
  
  b) sudo docker-compose up -d
  
  c) npx sequelize-cli db:migrate
  
  d) npx sequelize-cli db:seed:all

  с) node index.js
  
Тестировать с помощью : npm test

Тестовое задание номер два https://docs.google.com/document/d/17Ao_opzaQ-mjYdUYeCcfBU6BU6NK4TTe/edit
Как запустить:

  a) npm install
  
  b) sudo docker-compose up -d
  
  c) npx sequelize-cli db:migrate
  
  d) npx sequelize-cli db:seed:all

  c) Linux/Macos chmod +x start_apps.sh

  d) ./start_apps.sh

  schema:

![tasks](https://github.com/Jolboldu/balanceTest/assets/44244228/d2ed788c-deca-452f-a32d-ebf8d2667824)

Описание:

Каждоая node работает внезависимости от других node

Связть осуществляется через RabbitMQ

Один write/publish node запускает cron service и отправляет задачи на очередь 

RabbitMQ также занимается балансировкой, отправляет каждую задачу на определенный consumer/ read-node

Redis используется для отслеживания статуса текущих задач
