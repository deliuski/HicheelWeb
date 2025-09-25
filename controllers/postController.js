const Post = require("../models/Post")
exports.viewCreatePost = function (req, res) {
  res.render("create-post");
}


exports.createPost = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post.create().then(function () {  
    res.send("Бичвэр амжилттай хадгалагдлаа");
    }).catch(function (errors) {
        res.send(errors);

    });
}

exports.viewSinglePost = async (req, res) => {
    try {
        let post = await Post.findSingleById(req.params.id);
        res.render("single-post" , { post: post });
    } catch {
        res.render("404");
    }
}