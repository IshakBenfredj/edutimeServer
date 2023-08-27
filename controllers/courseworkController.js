import Coursework from '../models/Coursework.js'

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

export const addLike = async (req, res) => {
    const {courseworkId}  = req.body
    try {
        const coursework = await Coursework.findById(courseworkId);
        coursework.likes.push(req.user._id)
        console.log(coursework);
        await coursework.save()
        res.status(201).json({ coursework });
    } catch (error) {
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