module.exports = (sequelize, DataTypes) => {
    const ProductTypes = sequelize.define('ProductTypes', {
        id_type: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name: {
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
        },
    },{
        tableName: 'product_types'
    }) 

    return ProductTypes
}