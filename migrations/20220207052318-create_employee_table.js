'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('employees', { 
      id_emp: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
      },
      name: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      uid: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      address: {
        type : Sequelize.TEXT,
        allowNull : false,
      },
      dob: {
        type : Sequelize.DATEONLY,
        allowNull : false,
      },
      pob: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      phone: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      gender: {
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
    await queryInterface.dropTable('employees');
  }
};
