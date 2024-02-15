import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  accpetRefuseRes,
  addReservation,
  deleteReservation,
  getReservations,
} from "../controllers/reservationController.js";
const router = express.Router();

router.get("/", getReservations);
router.post("/add", requireAuth, addReservation);
router.delete("/delete/:id", requireAuth, deleteReservation);
router.put("/accpetRefuseRes/:etat", requireAuth, accpetRefuseRes);

export default router;