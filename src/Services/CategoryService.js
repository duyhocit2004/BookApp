const { Category } = require('../models/Category');

exports.PostCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.render('admin/Category/addCategory', { error: 'Vui lòng nhập tên danh mục' });
        }
        const connect = await Category();
        await connect.create({ name });
        return res.redirect('/admin/ListCategory');

    } catch (error) {
        console.log("Lỗi" + error);
        return res.render('admin/Category/addCategory', { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
    }
}

exports.DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID danh mục không hợp lệ' });
        }
        
        const connect = await Category();
        
        if (!category) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
        }
        
        await connect.destroy({ where: { id } });
        return res.status(200).json({ success: true, message: 'Xóa danh mục thành công' });

    } catch (error) {
        console.log("Lỗi" + error);
        return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
    }
}

exports.EditCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.redirect('/admin/ListCategory');
        }
        
        const connect = await Category();
        const category = await connect.findByPk(id);
        
        if (!category) {
            return res.redirect('/admin/ListCategory');
        }
        
        return res.render('admin/Category/editCategory', { category });

    } catch (error) {
        console.log("Lỗi" + error);
        return res.redirect('/admin/ListCategory');
    }
}

exports.UpdateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        if (!id || !name) {
            return res.render('admin/Category/editCategory', { 
                category: { id, name: name || '' },
                error: 'Vui lòng nhập đầy đủ thông tin' 
            });
        }
        
        const connect = await Category();
        
        await connect.update({ name }, { where: { id } });
        return res.redirect('/admin/ListCategory');

    } catch (error) {
        console.log("Lỗi" + error);
        return res.render('admin/Category/editCategory', { 
            category: { id: req.params.id, name: req.body.name || '' },
            error: 'Đã xảy ra lỗi. Vui lòng thử lại.' 
        });
    }
}