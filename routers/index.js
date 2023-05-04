const router = require("express").Router();
const userRouters = require("./userRouters");
const photoRouters = require("./photoRouters");
const commentRouters = require("./commentRouters");
const socialmediaRouters = require("./socialmediaRouters");

router.use("/users", userRouters);

router.use("/photos", photoRouters);

router.use("/comments", commentRouters);

router.use("/socialMedias", socialmediaRouters);

module.exports = router;
