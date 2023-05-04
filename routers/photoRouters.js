const router = require("express").Router();
const PhotoController = require("../controllers/photoController");

router.post("/", PhotoController.createPhoto);
router.get("/", PhotoController.getAllPhotos);
router.put("/:id", PhotoController.updatePhotoById);
router.delete("/:id", PhotoController.deletePhotoById);

module.exports = router;
