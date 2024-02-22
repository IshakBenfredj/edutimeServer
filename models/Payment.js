const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: String,
    courses: [String],
    paymentType: String,
    amount: String,
    seeit: { type: Boolean, default: false },
    etat: Boolean
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;