import Reservation from '../models/Reservation.js'

export const addReservation = async (req, res) => {

    try {
        const reservation = req.body;
        const { id }= req.params;
        reservation.courseworkId = id
        Reservation.create(reservation);
        res.status(201).json({ message: "تم إرسال الحجز بنجاح" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ بالسيرفر" });
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