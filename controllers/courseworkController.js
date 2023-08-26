import Coursework from '../models/Coursework.js'

export const addCoursework = async (req, res) => {
    const file = req.file;

    const { userId, name, category, price, dateStart, hours, description } = req.body;

    try {
        const coursework = new Coursework({
            userId,
            name,
            category,
            price,
            dateStart,
            hours,
            image: file.filename,
            description,
        });

        await coursework.save();

        res.status(201).json({ message: "تم إضافة التدريب بنجاح" });
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

export const deleteCoursework = async (req, res) => {
    try {
        const { id } = req.params
        await Coursework.findByIdAndDelete(id)
        res.status(201).json({ message : 'تم حذف التدريب' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
}