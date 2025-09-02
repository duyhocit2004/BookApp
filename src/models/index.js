const { connectDatabase } = require('../config/db');
const { Album } = require('./AlbumImage');
const { Product } = require('./Product');
const { Category } = require('./Category');
const {Location} = require('./LocationShop');
const { User } = require('./User');
const { role } = require('./Role');

(async () => {
    try {
        const sequelize = await connectDatabase();
        console.log("kết nối database", sequelize.config.database);

        
        await role();
        await Category();       // tạo bảng category
        await Product();        // tạo bảng product
        await Album();          // tạo bảng albumImage
        await Location();       // tạo bảng locationShop
        await TimeTable();      // tạo bảng timeTable
        await User();   


        process.exit();
    } catch (error) {

        process.exit(1);
    }
})();
