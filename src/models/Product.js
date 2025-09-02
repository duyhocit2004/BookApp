const { connectDatabase } = require('../config/db');
const { DataTypes } = require('sequelize')
const {Album }= require('./AlbumImage');

// let cate = Category();

const Product = async () => {
    const sequelize = await connectDatabase();
    const product = await sequelize.define('product', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        Category_id: {
           type: DataTypes.INTEGER,
           references :{
            key:"id",
            model : "category"
           }
        },
        title: {
            type: DataTypes.STRING(70),
        },
        LocationDetail: {
            type: DataTypes.STRING(100),
        },
        discount :{
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull :true
        }
        ,status:{
            type: DataTypes.INTEGER,
        }
    },{
        tableName:"product"
    })

    let AlbumImage = await Album();

    AlbumImage.belongsTo(product,{foreignKey:"product_id",as :"product"});
    product.hasMany(AlbumImage,{foreignKey:"product_id",as :"albumImage"})

    await product.sync({alter :true});
    return product;
}

module.exports = {Product}