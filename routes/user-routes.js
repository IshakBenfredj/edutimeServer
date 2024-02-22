const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const {
  deleteCenter,
  getUser,
  getUsers,
  like,
  resetNotify,
  update,
  updatePhotoProfile,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/resetNotify/:id", resetNotify);

router.put("/update/:id", requireAuth, update);
router.put("/like/:id", requireAuth, like);
router.put("/updatePhotoProfile", requireAuth, updatePhotoProfile);
router.delete("/delete/:id", requireAuth, deleteCenter);

module.exports = router;