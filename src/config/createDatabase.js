const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    port: 3306
});

const nameDB = "Bookapp"

async function CreateDatabase() {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXITS ${nameDB} `);
        console.log("Tạo database thành công");
    } catch (error) {
        console.log("tạo không thành công" + error);
        console.log(new Error("lỗi" + error))
    } finally {
        await sequelize.close();
    }
}

CreateDatabase();