const {connectDatabase} = require('../config/db');
const {DataTypes}=require('sequelize')

exports.Category  = async ()=>{
    const sequelize = await connectDatabase();
    const category = await sequelize.define('category',{
        id :{
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING(50)
        }
    },{
        tableName: 'category',
    })
    await category.sync({ alter: true });


    // const a = ['Tiệm cắt tóc','Luật Sư','Thợ sửa','Nhà văn','Trung tâm thể thao']
    // for (let index = 0; index <= a.length-1; index++) {
    //     category.create({name:array[index]})
    // }
    return category;
}
