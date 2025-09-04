const {DataTypes} = require('sequelize');
const {connectDatabase} = require('../config/db');
const {User}= require('./User')


const Post = async ()=>{
    const sequelize = await connectDatabase();
    const post = await sequelize.define('Post',{
        id :{
            primaryKey : true,
            autoIncrement : true,
            type:DataTypes.INTEGER
        },
        title:{
            type:DataTypes.STRING(100)
        },
        link:{
            type:DataTypes.STRING(100)
        },
        image:{
            type:DataTypes.TEXT
        },
        description:{
            type:DataTypes.TEXT
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model : "users",
                key : "id"
            }
        },
        status:{
            type : DataTypes.STRING,
            defaultValue : "active"
        }
    })  

    const user = await User();

    post.belongsTo(user,{foreignKey:'user_id',as :"users"});
    user.hasMany(post,{foreignKey:'user_id',as :"Post"});

    await post.sync({alter:true});
    return post

}

module.exports = {Post}
