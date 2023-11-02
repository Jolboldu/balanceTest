const express = require('express');
const Sequelize = require('sequelize');
const app = express()
const port = 3000
const service = require('./service')
const sequelize = new Sequelize('postgres://user:password@localhost:5432/dbname')
app.use(express.json());

const validateDeductBalance = (req, res, next) => {
  const { amount } = req.body;
  const { userID } = req.body;
  if(!amount || !userID) {
    return res.status(400).json({ error: 'Provide all parametres.' });
  }

  if (!Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Amount must be an integer.' });
  }

  if (!Number.isInteger(userID)) {
    return res.status(400).json({ error: 'UserID must be an integer.' });
  }
  next();
};

app.post('/deductBalance', validateDeductBalance, async (req, res) => {
  const userId = req.body.userID;
  const amount = req.body.amount;
  try{
    await service.deductBalance(userId, amount);
    res.json(true);
  } catch(e) {
    res.status(400);
    res.send(e.message)
  }
})

app.post('/setBalance', validateDeductBalance, async (req, res) => {
  const userId = req.body.userID;
  const amount = req.body.amount;
  try{
    await service.setBalance(userId, amount);
    res.json(true);
  } catch(e) {
    res.status(400);
    res.send(e.message)
  }
})


app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
    
  console.log(`Example app listening on port ${port}`)
})
