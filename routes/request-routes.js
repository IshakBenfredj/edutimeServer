const express = require("express");
const {
  addRequest,
  acceptRequest,
  refuseRequest,
  getRequests,
} = require("../controllers/requestController.js");
const requireAuth = require("../middlewares/requireAuth.js");
const router = express.Router();

router.get("/", requireAuth, getRequests);
router.post("/add", requireAuth, addRequest);
router.put("/accept/:id", requireAuth, acceptRequest);
router.put("/refuse/:id", requireAuth, refuseRequest);

module.exports = router;
