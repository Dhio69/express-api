module.exports = (sequelize, DataTypes) => {
    const ProductTypes = require('./ProductTypes')
    const Product = sequelize.define('Product', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        brand : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description: {
            type : DataTypes.TEXT,
            allowNull : true,
        },
        image: {
            type : DataTypes.TEXT,
            allowNull : true,
        },
        id_type: {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        stock: {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        createdAt: {
            type : DataTypes.DATE,
            allowNull : false,
        },
        updatedAt: {
            type : DataTypes.DATE,
            allowNull : false,
        },
    },{
        tableName: 'products'
    }) 

    Product.associate = (models) => {
        Product.hasOne(models.ProductTypes, {
            foreignKey: 'id_type'
        })
    }

    return Product
}