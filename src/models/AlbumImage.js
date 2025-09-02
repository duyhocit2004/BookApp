const {connectDatabase} = require('../config/db');
const {DataTypes}=require('sequelize')

exports.Album = async ()=>{
    const sequelize = await connectDatabase();
    const albumImage = await sequelize.define('albumImage',{
        id :{
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        product_id:{
             type : DataTypes.INTEGER,
            references:{
                key:"id",
                model:"product"
            }
        },
        link_image : {
            type : DataTypes.TEXT
        }
    },{
        tableName: 'albumImage',
    })
    await albumImage.sync({ alter: true });
    return albumImage;
}