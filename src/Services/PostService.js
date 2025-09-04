const {Post} = require('../models/Post')
const JWT = require('jsonwebtoken');
require('dotenv').config();
const {Op} = require('sequelize');
const fs = require('fs');
const path = require('path');
exports.ListPost = async (req,res)=>{
    try {
        const connectPost = await Post();

        let page = 1;
        let limit = 10;
        let offset = (page - 1) * 10
        
        const search = {}
        if(req.query && req.query.search ){
            search.title ={[Op.like] : `%${req.query.search}%`}
        }
        const {count,rows} = await connectPost.findAndCountAll(
            {
                where:search,
                limit:limit,
                offset : offset,
                order :[["createdAt","DESC"]]
            }
        );

        // const post = await connectPost.findAll();
        // console.log(ListPost);

        return res.render('admin/Post/ListPost',{
                data : rows,
                totalItems: count,
                totalPages: Math.ceil(page / limit),
                currentPage: page,
                error:"xinchao",
                search:req.query.search,
        })
    } catch (error) {
        console.log(error);
        return res.redirect('/admin/ListPost')
    }
}
exports.AddPost = async (req,res)=>{
    try {

        const connectPost = await Post();

        const {link,title,description,status} =req.body;   
        const image = req.file
        const data = '/images/'+image.filename

        const token = req.cookies.accessToken;
        const user = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const POST = await connectPost.create({link,title,description,image:data,user_id:user.id,status});

        if(POST){
            return res.redirect('/admin/ListPost')
        }

    } catch (error) {
        console.log("lỗi" + error);
        return res.render('admin/Post/ListPost',{

        })
    }
}

exports.FormEdit = async (req,res)=>{
    try {
        const connectPost = await Post();

        const id = req.params.id;

        if(!id){
            res.render('admin/Post/ListPost')
        }

        const data = await connectPost.findByPk(id);
        

        res.render('admin/Post/EditPost',{
            post: data
        })
    } catch (error) {
        console.log("lỗi" + error);
        res.render('admin/Post/ListPost')
    }
}
exports.EditPost = async (req,res)=>{
    try {

        const connectPost = await Post();

        const id = req.params.id;

        const data = await connectPost.findByPk(id);

        const {title,description,link,status} = req.body;

        console.log(title,description,link,status)

        if(!data){
            res.redirect('/admin/ListPost')
        }
        // await fs.unlink(path.join(__dirname,'../public',data.image));

        const file = req.file;
        const image = "/images/"+file.filename;

        let post = await connectPost.update(
            
            {
                title:title ,
                description : description,
                link:link,
                status:status,
                image:image
            },
            {
                where:{
                    id:id
                }
            }
        
        )
        console.log(title,description,link,status)
        if(post){
            return res.redirect('/admin/ListPost')
        }

    } catch (error) {
        
        console.log("lỗi"+error);
        return res.redirect('/admin/ListPost')
    }
}

exports.DeletePost = async (req,res)=>{
     
    const connectPost = await Post();

    const id = req.params.id;
    const data =await connectPost.destroy({
        where :{
            id : id
        },
        force : true
    })

    if(data){
        return res.redirect('/admin/ListPost');
    }

}