const { connectDatabase } = require('../config/db');
const { DataTypes } = require('sequelize')

exports.TimeTable = async () => {
    const sequelize = await connectDatabase();
    const timeTable = await sequelize.define('timeTable', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: "product"
            },
        },
        monday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        monday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        tuesday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        tuesday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        wenestday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        wenestday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        thursday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Thursday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        friday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        friday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Saturday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Saturday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
        sunday_start: {
            type: DataTypes.TIME,
            allowNull: true
        },
        sunday_end: {
            type: DataTypes.TIME,
            allowNull: true
        },
    },{
        tableName:"timeTable"
    })
    await timeTable.sync({ alter: true });
    return timeTable;
}