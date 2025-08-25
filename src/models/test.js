const {connectDatabase} = require('../config/db');
const {DataTypes}=require('sequelize')


exports.test = async ()=>{
    const sequelize = await connectDatabase();
    const dd = sequelize.define('users',{},{
        tableName:"user"
    })
}