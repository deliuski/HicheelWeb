const postsCollection = require("../db").collection("posts");
const { ObjectId } = require("mongodb");



let Post = function (data , user_id) {
    this.data = data;
    this.errors = [];
    this.user_id = user_id;
};
Post.findSingleById = function (id) {
    return new Promise(async (resolve, reject) => {
        try{
            let post = await postsCollection.findOne({_id: new ObjectId(id)});
            if(post){
                resolve(post);
            } else{
                reject("Post олдсонгүй");
            }
        }
        catch{
            reject("DB алдаа гарлаа");
        }
    });
}

Post.prototype.validate = function () {
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        author: this.user_id,
        createDate: new Date()
    }
    if (this.data.title == "") this.errors.push("Гарчиг хоосон байна");
    if (this.data.body == "") this.errors.push("Бичвэр хоосон байна");
}

Post.prototype.create = function () {
    return new Promise((resolve, reject) => {
        this.validate();    
        if (this.errors.length) {
            reject(this.errors);
        } else {
            postsCollection.insertOne(this.data).then(() => {
                resolve();
            }).catch(() => {
                this.errors.push("Алдаа гарлаа. Дахин оролдоно уу");
                reject(this.errors);
            })
        
        }     
    });
}

module.exports = Post;