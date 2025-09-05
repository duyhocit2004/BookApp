const { Category } = require('../../models/Category');
const CategoryService = require('../../Services/CategoryService');

exports.ListCategory = async (req, res, next) => {
    try {
        const connect = await Category();
        const { count, rows } = await connect.findAndCountAll();
        return res.render('admin/Category/listCategory', { Category: rows });

    } catch (error) {
        console.log("Lỗi" + error);
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