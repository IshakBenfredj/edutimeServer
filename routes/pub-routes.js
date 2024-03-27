const express = require("express");
const router = express.Router();
const Pub = require("../models/Pub.js");
const requireAuth = require("../middlewares/requireAuth.js");
const { uploadImage, deleteImage } = require("../middlewares/uploadImage.js");

router.post("/", requireAuth, async (req, res) => {
  try {
    const image = await uploadImage(req.body.image);
    const publication = new Pub({ image });
    await publication.save();
    res.status(201).json(publication);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pubs = await Pub.find();
    res.status(201).json(pubs);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const publication = await Pub.findByIdAndDelete(req.params.id);
    await deleteImage(publication.image);
    res.json({ message: "تم الحذف" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
