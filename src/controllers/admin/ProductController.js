// const {defineAlbum,defineProduct} = require('../../models/index');
const { Product } = require('../../models/Product');
const { Op } = require('sequelize');
const { Album } = require('../../models/AlbumImage')

exports.ListProduct = async (req, res, next) => {
    try {

        const connect = await Product();
        const AlbumImage = await Album();

        let pageProduct = null;

        if (req.query && req.query.page) {
            pageProduct = req.query.page
        }

        let page = pageProduct || 1;
        let limit = 10;
        let offset = (page - 1) * 10

        let condition = {};
        if (req.query && req.query.search) {
            condition.title = { [Op.like]: `%${req.query.search}%` };
        }

        const { count, rows } = await connect.findAndCountAll({
            where: condition,
            include: { model: AlbumImage, as: "albumImage" },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
        })

        return res.render('admin/Product/listProduct', {
            products: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            error: "xinchao",
            search: req.query.search,
        })
    } catch (error) {
        console.log("lỗi" + error);

    }

}

exports.statusProduct = async (req, res) => {
    try {

        const connect = await Product()

        const id = req.param;

        const product = await connect.findOne({ where: { id: id } });
        if (!product) {
            res.render('admin/Product/listProduct', { error: "sản phẩm không tồn tại" })
        }

        if (product.status === 1) {
            await connect.update(
                { status: 2 },
                {
                    Where: {
                        id: id
                    }
                }
            )
        } else {
            await connect.update(
                { status: 1 },
                {
                    Where: {
                        id: id
                    }
                }
            )
        }

        return res.render('admin/Product/listProduct', {
            success: "chỉnh sửa thành công"
        })
    } catch (error) {
        console.log("lỗi" + error);
        return res.render('admin/Product/listProduct', {
            error: "sửa không thành công"
        })
    }
}