const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const {
  accpetRefuseRes,
  addReservation,
  deleteReservation,
  getReservations,
} = require("../controllers/reservationController.js");

const router = express.Router();

router.get("/", getReservations);
router.post("/add", requireAuth, addReservation);
router.delete("/delete/:id", requireAuth, deleteReservation);
router.put("/accpetRefuseRes/:etat", requireAuth, accpetRefuseRes);

module.exports = router;