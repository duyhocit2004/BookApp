const PostService = require('../../Services/PostService');

exports.GetListPost = (req,res)=>{
    return PostService.ListPost(req,res);
}
exports.FormAddPost = (req,res)=>{
    return res.render('admin/Post/AddPost');
}
exports.AddPost=(req,res)=>{
    return PostService.AddPost(req,res);
}
exports.FormEdit =(req,res)=>{
    return PostService.FormEdit(req,res);
}
exports.EditPost = (req,res)=>{
    return PostService.EditPost(req,res);
}
exports.DeletePost = (req,res)=>{
    return PostService.DeletePost(req,res);
}