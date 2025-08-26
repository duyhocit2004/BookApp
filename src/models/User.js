const { connectDatabase } = require('../config/db');
const { DataTypes } = require('sequelize')


exports.User = async () => {
    const sequelize = await connectDatabase();
    const user = sequelize.define('users', {
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
            }
        }
    })
    await sequelize.sync({ alter: true });
    return user;
}