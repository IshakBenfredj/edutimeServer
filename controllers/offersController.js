import Offer from "../models/Offers.js";
import User from "../models/User.js";

export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();

    res.status(201).json(offers[0]);
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const updateOffers = async (req, res) => {
    try {
        const {month, sixMonths,year} = req.body
        const user = await User.findById(req.user._id)
        if ( user.type === 'admin' ) {
                const offers = await Offer.find();
                offers[0].month = month
                offers[0].sixMonths = sixMonths
                offers[0].year = year
        
                await offers[0].save()
        
            res.status(201).json({message : 'تم تحديث العروض'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};