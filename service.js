const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/dbname') // Example for postgres
const { User } = require('./models');

async function deductBalance(userID, amount) {
    try {
      const [numberOfUpdatedRows] = await User.update(
        { balance: sequelize.literal(`balance - ${amount}`) },
        {
          where: { id: userID },
        }
      );
  
      if (numberOfUpdatedRows === 0) {
        throw new Error('User not found');
      }

    } catch (error) {
      throw new Error('CONSTRAINT VIOLATION');
    }
}

async function setBalance(userID, amount) {
  try {
    const [numberOfUpdatedRows] = await User.update(
      { balance: amount },
      {
        where: { id: userID },
      }
    );

    if (numberOfUpdatedRows === 0) {
      throw new Error('User not found');
    }

  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
    deductBalance,
    setBalance,
}
