const { connectDatabase } = require('../config/db');
const { DataTypes } = require('sequelize')


const User = async () => {
    const sequelize = await connectDatabase();
    const user = await sequelize.define('users', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        phone: {
            type: DataTypes.STRING(10),
        },
        password: {
            type: DataTypes.STRING(100),
        },
        province_code: {
            type: DataTypes.STRING(100),
            allowNull :true
        },
        province_name: {
            type: DataTypes.STRING(100),
            allowNull :true
        },
        district_code: {
            type: DataTypes.STRING(100),
            allowNull :true
        },
        district_name: {
            type: DataTypes.STRING(100),
            allowNull :true
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "role",
                key: "id"
            },
            defaultValue : 1
        }
    },{
        tableName:"users"
    })
    await user.sync();
    return user;
}

module.exports = {User}