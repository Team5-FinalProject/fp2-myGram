const router = require("express").Router();
const SocialMediaController = require("../controllers/socialmediaController");

router.post("/", SocialMediaController.createSocialmedia);
router.get("/", SocialMediaController.getAllSocialmedias);
router.put("/:id", SocialMediaController.updateSocialmediaById);
router.delete("/:id", SocialMediaController.deleteSocialmediaById);

module.exports = router;
