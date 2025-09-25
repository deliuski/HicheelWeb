const usersCollection = require("../db").collection("users");
const validator = require("validator");
const bcrypt = require("bcryptjs");

let User = function (data) {
  this.data = data;
  this.name = "saraa";
  this.errors = [];
  this._id = null;
};



User.prototype.login = async function () {
  return new Promise(async (resolve, reject) => {
    let loginuser = await usersCollection.findOne({
      username: this.data.username,
    });

    if (loginuser && bcrypt.compareSync(this.data.password, loginuser.password)) {
      this._id = loginuser._id;
      resolve("Congratulations! Login success!");
    } else {
      reject("Invalid username or password...");
    }
  });
};



User.prototype.validate = async function () {
  return new Promise(async (resolve, reject) => {
    console.log(this.data);
  if (!this.data.username) this.errors.push("Та нэрээ бичнэ үү");
  if (this.data.username && !validator.isAlphanumeric(this.data.username))
    this.errors.push("Нэр зөвхөн үсэг тооноос тогтож болно");
  if (!this.data.email) this.errors.push("Та имэйлээ бичнэ үү");
  if (this.data.email && !validator.isEmail(this.data.email))
    this.errors.push("Таны имэйл буруу байна");
  if (!this.data.password) this.errors.push("Та нууц үгээ бичнэ үү");
  if (this.data.password && this.data.password.length < 6)
    this.errors.push("Нууц үг дор хаяж 6 тэмдэгтээс бүрдэх ёстой");

  if(this.data.username && this.data.username.length >= 4){
    let sameUser = await usersCollection.findOne({username: this.data.username});
    if(sameUser) this.errors.push("Таны сонгосон нэр ашиглагдаж байна. Өөр нэр сонгоно уу");
  }
  if(this.data.email && validator.isEmail(this.data.email)){
    let sameEmail = await usersCollection.findOne({email: this.data.email});
    if(sameEmail) this.errors.push("Таны имэйл ашиглагдаж байна. Өөр имэйл сонгоно уу");
  }
  resolve();
  });
};

User.prototype.register = async function () {
  return new Promise(async (resolve, reject) => {
     await this.validate();
  console.log(usersCollection);
  console.log(this.data);
  if (!this.errors.length) {
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);
    await usersCollection.insertOne(this.data);
    resolve();
  }
  else {
    console.log("🚀 ~ this.errors:", this.errors) 
    reject(this.errors);
   
  } 
  });
};



module.exports = User;
