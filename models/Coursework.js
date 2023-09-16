import mongoose from 'mongoose';
import User from './User.js';
import { sendMailPayment } from '../middlewares/nodemailer.js';

const courseworkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    dateStart: { type: String, required: true },
    hours: { type: Number, required: true },
    likes: { type: Array, default: [] },
    personsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    activation: { type: Boolean, default: false },
    activationDate: Date,
    createdAt: { type: Date, default: new Date() }
});

const Coursework = mongoose.model('Coursework', courseworkSchema);

export default Coursework;