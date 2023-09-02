import Reservation from '../models/Reservation.js'
import User from '../models/User.js';

export const addReservation = async (req, res) => {

    try {
        const reservation = req.body;
        const { id,centerId }= req.params;
        reservation.courseworkId = id
        reservation.centerId = centerId
        reservation.reservator = req.user._id
        await Reservation.create(reservation);
        const user = await User.findById(centerId);
        user.notifyCount = user.notifyCount + 1
        await user.save()
        res.status(201).json({ message : "تم إرسال الحجز بنجاح" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : "خطأ بالسيرفر" });
    }
}

export const getReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find();
        const reservations = allReservations.reverse()

    res.status(201).json({ reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params
        await Reservation.findByIdAndDelete(id)
        res.status(201).json({ message : 'تم حذف الحجز' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
}