const {connectDatabase} = require('../config/db');
const {DataTypes}=require('sequelize')


exports.role  = async ()=>{
    const sequelize = await connectDatabase();
    let role = await sequelize.define('role',{
        id :{
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING(50)
        },
        createdAt:{
            type : DataTypes.DATE
        },
        updatedAt:{
            type : DataTypes.DATE
        }
    },{
        tableName :"role",
        timestamps : true
})
    
    await role.sync({ alter: true });
    return role;
}