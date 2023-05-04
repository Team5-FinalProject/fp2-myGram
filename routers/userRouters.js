const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
