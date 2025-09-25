let User = require("../models/User");

exports.checkLogin = function (req, res,next) {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", "Та эхлээд нэвтэрнэ үү");
    req.session.save(() => res.redirect("/"));
  }
};


exports.home = function (req, res) {
  if (req && req.session.user) {
    res.render("home-dashboard");
    return;
  }
  res.render("home-guest" , { errors: req.flash("errors") });
};


exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = { username: user.data.username };
      // sessoin Ийг mongodb дээр хадгалж дуусыны дараа redirect хийх
      req.session.save(() =>  {
        res.redirect("/");
      });
    })
    .catch(function (err) {
      req.flash("errors", err);
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.register = function (req, res) {
  let user = new User(req.body);
  user.register()
  .then(() => {
    req.session.user = { username: user.data.username };
    req.session.save(() => {
      res.redirect("/");
    });
  })
  .catch((errors) => {
    req.flash("errors", errors);
    console.log("🚀 ~ errors:", errors)
    req.session.save(() => {
      res.redirect("/");
    });
  }
)};

exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
};