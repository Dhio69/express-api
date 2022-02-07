module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
         id_emp: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
          },
          name: {
            type : DataTypes.STRING,
            allowNull : false,
          },
          uid: {
            type : DataTypes.STRING,
            allowNull : false,
          },
          address: {
            type : DataTypes.TEXT,
            allowNull : false,
          },
          dob: {
            type : DataTypes.DATEONLY,
            allowNull : false,
          },
          pob: {
            type : DataTypes.STRING,
            allowNull : false,
          },
          phone: {
            type : DataTypes.STRING,
            allowNull : false,
          },
          gender: {
            type : DataTypes.STRING,
            allowNull : false,
          },
          createdAt: {
            type : DataTypes.DATE,
            allowNull : false,
          },
          updatedAt: {
            type : DataTypes.DATE,
            allowNull : false,
          }
    },{
        tableName: 'employees'
    }) 

    return Employee
}