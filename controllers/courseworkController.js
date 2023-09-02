import Coursework from '../models/Coursework.js'
import Reservation from '../models/Reservation.js'

export const addCoursework = async (req, res) => {

    try {
        const formData = req.body;
        const file = req.file;
        formData.userId = req.user._id
        formData.image = file.filename
        const newUser = Coursework.create(formData);
        res.status(201).json({ message: "تم إضافة الدورة بنجاح" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ بالسيرفر" });
    }
}

export const getCourseworks = async (req, res) => {
    try {
        const allCourseworks = await Coursework.find();
        const courseworks = allCourseworks.reverse()

    res.status(201).json({ courseworks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const like = async (req, res) => {
    const { courseworkId }  = req.body
    try {
        const coursework = await Coursework.findById(courseworkId);
        const userIndex = coursework.likes.indexOf(req.user._id);
        
        if (userIndex === -1) {
            coursework.likes.push(req.user._id);
        } else {
            coursework.likes.splice(userIndex, 1);
        }
        
        await coursework.save();
        res.status(201).json({ coursework });
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};


export const updateCoursework = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const course = await Coursework.findById(id)
        if (data.price.length) {
            course.price = data.price
        }
        if (data.hours.length) {
            course.hours = data.hours
        }
        if (data.dateStart.length) {
            course.dateStart = data.dateStart
        }
        if (data.description.length) {
            course.description = data.description
        }
        await course.save()
        res.status(201).json({course, message : 'تم التحديث بنجاح' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
}

export const deleteCoursework = async (req, res) => {
    try {
        const { id } = req.params;
        const coursework = await Coursework.findById(id);

        await Reservation.deleteMany({ courseworkId: coursework._id });

        await Coursework.findByIdAndDelete(id);

        res.status(201).json({ message: 'تم حذف الدورة وكل الحجوزات المرتبطة بها' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};
