const express = require("express");
const {
  addRequest,
  deleteRequest,
  acceptRequest,
  refuseRequest,
} = require("../controllers/requestController.js");
const requireAuth = require("../middlewares/requireAuth.js");
const router = express.Router();

router.post("/add", requireAuth, addRequest);
router.delete("/delete/:id", requireAuth, deleteRequest);
router.put("/accept/:id", requireAuth, acceptRequest);
router.put("/refuse/:id", requireAuth, refuseRequest);

module.exports = router;
