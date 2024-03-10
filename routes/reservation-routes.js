const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const {
  accpetRes,
  addReservation,
  deleteReservation,
  getClientReservations,
  getUserReservations,
} = require("../controllers/reservationController.js");

const router = express.Router();

router.post("/add", requireAuth, addReservation);
router.get("/client",requireAuth, getClientReservations);
router.get("/user",requireAuth, getUserReservations);
router.delete("/delete/:id", requireAuth, deleteReservation);
router.put("/accept/:id", requireAuth, accpetRes);

module.exports = router;