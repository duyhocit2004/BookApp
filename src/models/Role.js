const {connectDatabase} = require('../config/db');
const {DataTypes}=require('sequelize')

exports.role  = async ()=>{
    const sequelize = await connectDatabase();
    const role = await sequelize.define('role',{
        id :{
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING(50)
        }
    })
    await sequelize.sync({ alter: true });
    return role;
}