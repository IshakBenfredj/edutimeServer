import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: String,
    courses: [String],
    paymentType : String,
    amount : String,
    seeit : {type: Boolean , default: false},
    etat : Boolean
},{timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment