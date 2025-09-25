const express = require("express");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const router = express.Router();

router.get("/", userController.home);
router.post("/register", userController.register);
router.get("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/create-post",userController.checkLogin , postController.viewCreatePost);

module.exports = router;
