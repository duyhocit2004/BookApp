const { Category } = require('../models/Category');

exports.PostCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.render('admin/Category/addCategory', { error: 'Vui lòng nhập tên danh mục' });
        }
        
        const connect = await Category();
        
        const existingCategory = await connect.findOne({
            where: { name: name.trim() }
        });
        
        if (existingCategory) {
            return res.render('admin/Category/addCategory', { 
                error: 'Tên danh mục đã tồn tại. Vui lòng chọn tên khác.',
                name: name.trim()
            });
        }
        
        await connect.create({ name: name.trim() });
        return res.redirect('/admin/ListCategory?success=add');

    } catch (error) {
        console.log("Lỗi" + error);
        return res.render('admin/Category/addCategory', { 
            error: 'Đã xảy ra lỗi. Vui lòng thử lại.',
            name: req.body.name || ''
        });
    }
}

exports.DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID danh mục không hợp lệ' });
        }
        
        const connect = await Category();
        const category = await connect.findByPk(id);
        
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
        
        // Kiểm tra trùng tên danh mục (loại trừ danh mục hiện tại)
        const existingCategory = await connect.findOne({
            where: { 
                name: name.trim(),
                id: { [require('sequelize').Op.ne]: id }
            }
        });
        
        if (existingCategory) {
            return res.render('admin/Category/editCategory', { 
                category: { id, name: name.trim() },
                error: 'Tên danh mục đã tồn tại. Vui lòng chọn tên khác.' 
            });
        }
        
        await connect.update({ name: name.trim() }, { where: { id } });
        return res.redirect('/admin/ListCategory?success=edit');

    } catch (error) {
        console.log("Lỗi" + error);
        return res.render('admin/Category/editCategory', { 
            category: { id: req.params.id, name: req.body.name || '' },
            error: 'Đã xảy ra lỗi. Vui lòng thử lại.' 
        });
    }
}

exports.CheckCategoryName = async (req, res) => {
    try {
        const { name, excludeId } = req.body;
        
        if (!name || name.trim() === '') {
            return res.json({ exists: false });
        }
        
        const connect = await Category();
        const { Op } = require('sequelize');
        
        let whereCondition = { name: name.trim() };
        
        // Nếu có excludeId (khi edit), loại trừ category hiện tại
        if (excludeId) {
            whereCondition.id = { [Op.ne]: excludeId };
        }
        
        const existingCategory = await connect.findOne({
            where: whereCondition
        });
        
        return res.json({ exists: !!existingCategory });

    } catch (error) {
        console.log("Lỗi" + error);
        return res.status(500).json({ exists: false, error: 'Đã xảy ra lỗi khi kiểm tra tên' });
    }
}

exports.SearchCategory = async (req, res) => {
    try {
        const { search } = req.query;
        
        if (!search || search.trim() === '') {
            return res.redirect('/admin/ListCategory');
        }

        const connect = await Category();
        const { Op } = require('sequelize');
        
        const categories = await connect.findAll({
            where: {
                name: {
                    [Op.like]: `%${search.trim()}%`
                }
            },
            order: [['name', 'ASC']]
        });

        return res.render('admin/Category/listCategory', { 
            Category: categories,
            searchTerm: search.trim(),
            searchResults: categories.length
        });

    } catch (error) {
        console.log("Lỗi" + error);
        return res.render('admin/Category/listCategory', { 
            Category: [],
            searchTerm: req.query.search || '',
            searchResults: 0,
            error: 'Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.'
        });
    }
}