const { Category } = require('../../models/Category');
const CategoryService = require('../../Services/CategoryService');
const { Op } = require('sequelize');

exports.ListCategory = async (req, res, next) => {
    try {
        const connect = await Category();
        
        let condition = {};
        if (req.query && req.query.search) {
            condition.name = { [Op.like]: `%${req.query.search}%` };
        }

        const { count, rows } = await connect.findAndCountAll({
            where: condition,
            order: [['name', 'ASC']]
        });

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.json({
                success: true,
                categories: rows,
                totalItems: count,
                searchTerm: req.query.search || ''
            });
        }

        // Nếu là request bình thường, render trang
        return res.render('admin/Category/listCategory', { 
            Category: rows,
            searchTerm: req.query.search || '',
            searchResults: count,
            success: req.query.success || null
        });

    } catch (error) {
        console.log("Lỗi" + error);
        
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({
                success: false,
                message: 'Đã xảy ra lỗi khi tìm kiếm'
            });
        }
        
        return res.redirect('/admin/');
    }
}


exports.AddCategory = async (req, res, next) => {
    try {
        return res.render('admin/Category/addCategory');

    } catch (error) {
        console.log("Lỗi" + error);
        return res.redirect('/admin/ListCategory');
    }
}

exports.PostCategory = async (req, res) => {
    return await CategoryService.PostCategory(req, res);
}

exports.DeleteCategory = async (req, res) => {
    return await CategoryService.DeleteCategory(req, res);
}

exports.EditCategory = async (req, res) => {
    return await CategoryService.EditCategory(req, res);
}

exports.UpdateCategory = async (req, res) => {
    return await CategoryService.UpdateCategory(req, res);
}

exports.CheckCategoryName = async (req, res) => {
    return await CategoryService.CheckCategoryName(req, res);
}