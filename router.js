let express = require("express");
let userController = require("./controllers/userController");
const router = express.Router();

router.get("/", userController.home);
router.post("/register", userController.register);
router.get("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
