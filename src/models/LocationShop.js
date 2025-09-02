const { connectDatabase } = require('../config/db');
const { DataTypes } = require('sequelize')


const Location = async () => {
    const sequelize = await connectDatabase();
    const locationShop = await sequelize.define('locationShop', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        product_id: {
           type: DataTypes.INTEGER,
           references :{
            key:"id",
            model : "product"
           },
           allowNull :true
        },
        location_detail: {
            type: DataTypes.STRING(70),
            allowNull :true
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull :true
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull :true
        },
        domain: {
            type: DataTypes.TEXT,
            allowNull :true
        }
        ,
    },{
        tableName:"locationShop"
    })
    await locationShop.sync({alter :true});
    return locationShop;
}

module.exports = {Location}