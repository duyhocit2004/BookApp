const { Sequelize } = require('sequelize');


const connectDatabase = async () => {
    const sequelize = new Sequelize('Bookapp', 'root', '', {
        host: 'localhost',
        dialect: "mysql",
        port: 3306
    })

    try {
        // await sequelize.authenticate()
        console.log("kết nối thành công");
        return sequelize;
    } catch (error) {
        console.log("kết nối thất bại" + error)
        sequelize.close();
    }
}

module.exports = {connectDatabase}
