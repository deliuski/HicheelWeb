let User = require("../models/User");

exports.home = function (req, res) {
    res.render("home-guest");
}

exports.login = function (req, res) {
    let user = new User(req.body);
    user.login().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    })
}

exports.register = function (req, res) {
    let user = new User(req.body);
    user.register();
    if(user.error.length){
        res.send({ error: user.errors });
        return;
    }


    console.log("Username : " + req.body.username);
    console.log("Email : " + req.body.email)
    console.log("Password : " + req.body.password)

    res.send("thanks for registering");
}

exports.store = function (req, res) {
    const products = [
        { id: 1, name: 'Acme Circles T-Shirt', price: '20.00 USD', image: '/images/tshirt.jpg' },
        { id: 2, name: 'Acme Drawstring Bag', price: '12.00 USD', image: '/images/tshirt.jpg' },
        { id: 3, name: 'Acme Mug', price: '15.00 USD', image: '/images/tshirt.jpg' },
        // Бусад бүтээгдэхүүн нэмэх боломжтой
    ];
    res.render('store', { products: products, message: req.query.message });
}