'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


    await queryInterface.addConstraint('Users', {
      fields: ['balance'],
      type: 'check',
      where: {
        balance: {
            [Sequelize.Op.gte]: 0
        }
    }
  });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};