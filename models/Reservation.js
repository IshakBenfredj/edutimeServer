import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    courseworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coursework', required: true },
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    phone: { type: String, required: true },
    wilaya: { type: String, required: true },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;