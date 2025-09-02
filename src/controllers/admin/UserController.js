const { User } = require('../../models/User');
const { Op } = require('sequelize');
const { role } = require('../../models/Role');

exports.AccountUser = async (req, res) => {
    try {
        const connect = await User();
        const Role = await role();

        const page = req.query.page || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || null;

        let where ={ role_id :1};
        if(req.query && req.query.search){
            where.title = { [Op.like]: `%${search}%` };
            
        }
        
         const { count, rows } = await connect.findAndCountAll({
            where,
            include: { model:Role, as: "role" },
            limit: limit,
            offset: offset,
            order: [["createdAt", 'DESC']]
        })


        return res.render('admin/user/AccountClient', {
            UserClient: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            error: "xinchao",
            search: req.query.search,

        })
    } catch (error) {
        console.log("Lỗi" + error);
        return res.redirect('/admin/');
    }
}

exports.AccountBusiness = async (req, res) => {
    try {
        const connect = await User();
        const Role = await role();

        const page = req.query.page || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || null;

        let where ={ role_id :1};
        if(search){
            where.title = { [Op.like]: `%${search}%` };
            
        }
         const { count, rows } = await connect.findAndCountAll({
            where,
            include: { model:Role, as: "role" },
            limit: limit,
            offset: offset,
            order: [["createdAt", 'DESC']]
        })


        return res.render('admin/user/AccountBusiness', {
            UserBusiness: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            error: "xinchao",
            search: req.query.search,

        })
    } catch (error) {
        console.log("Lỗi" + error);
        return res.redirect('/admin/');
    }
}

exports.GetDetailAccount = async (req,res)=>{
    try {
        const id = req.params.id;
        console.log("day la id"+id)
        const connect = await User();

        const data = await connect.findOne({where:{id : id}});

        if(!data) return res.json({
            message : "Tài khoản không tồn tại",
            status : 404
        })

        return res.json({
            data : data,
            message : "Tìm kiếm tài khoản thành công",
            status : 200 
        })
    } catch (error) {
        console.log("lỗi" +error);
        return res.json({
            data: null,
            messdata:"lỗi" +error,
            status: 404
        })
    }
}

exports.UpdateAccount = async (req,res)=>{
    try {

        const connect = await User();

        const id = req.params.id ;

        const status1 = req.body.status;

        const data = await connect.findByPk(id);

        if(!data){
            return res.json({
                data : null,
                message : "Tìm kiếm sản phẩm không thành công",
                status:204
            })
        }
        
       const sss = await connect.update(
        {status : status1},
        {
            where :{
                id : id
            }
        }
       )
       
        return res.json({
                data : sss,
                message : "Chỉnh sửa trạng thái người dùng thành công",
                status:200
            })
    } catch (error) {
        console.log("lỗi"+error);
        return res.json({
                data : null,
                message : "bị lỗi" + error,
                status:204
            })
    }
}