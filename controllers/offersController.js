import Offer from "../models/Offers.js";

export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();

    res.status(201).json(offers[0]);
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

