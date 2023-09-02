import mongoose from "mongoose";

const Scheme = mongoose.Schema 

const offerSchema = new Scheme({
    month : String,
    sixMonths : String,
    year : String,
})

const Offer = mongoose.model('Offer', offerSchema);

export default Offer


