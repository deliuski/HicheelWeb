let express = require("express");
let app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
let router = require("./router.js");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: "SukinaAppSecret",
        store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING , dbName: "SukinaSocialApp", collectionName: "sessions"}),
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    })
);
app.use(flash());

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use("/", router);

 
module.exports = app;
