'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.createTable('users', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
      },
      username: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      password: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      createdAt: {
        type : Sequelize.DATE,
        allowNull : false,
      },
      updatedAt: {
        type : Sequelize.DATE,
        allowNull : false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
