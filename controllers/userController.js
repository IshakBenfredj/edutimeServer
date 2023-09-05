import Coursework from "../models/Coursework.js";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
    const { userId } = req.params; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user doesn't exist" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: "Server Error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const usersFind = await User.find();
        const users = usersFind.reverse();

        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: "Server Error" });
    }
};

export const likeCenter = async (req, res) => {
    const { centerId } = req.body;
    try {
        const center = await User.findById(centerId);
        const userIndex = center.likes.indexOf(req.user._id);

        if (userIndex === -1) {
            center.likes.push(req.user._id);
        } else {
            center.likes.splice(userIndex, 1);
        }

        await center.save();
        res.status(201).json({ center });
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};


export const updateUser = async (req, res) => {
    const { info, type }  = req.body;
    const { id }  = req.params;
    
    try {
        if (!info) {
            return res.status(404).json({ error: 'يجب ملئ الحقل' });
        }
        const user = await User.findById(id);
        
        switch (type) {
            case 'name':
                user.name  = info
                await user.save()
            break;
            case 'email':
                const exist = await User.find({email : info})
                if (exist) {
                    return res.status(400).json({ error: 'إيميل موجود بالفعل' });
                }
                user.email  = info
                await user.save()
            break;
            case 'phone':
                user.phone  = info
                await user.save()
            break;
            case 'address':
                user.address  = info
                await user.save()
            break;
            case 'password':
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(info, salt);
                user.password  = hashedPassword
                await user.save()
            break;
        }
        
        return res.status(201).json(user); 
    } catch (error) {
        return res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const updatePhotoProfile = async (req,res) => {
    try {
        const formData = req.body
        const {id} = req.params
        const user = await User.findById(id)
        const file = req.file
        console.log(file);
        formData.image = file.filename
        if (formData.image.length) {
            user.image = formData.image
        }
        await user.save()
        return res.status(201).json({message: 'تم تحديث صورة الملف الشخصي'}); 
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
}

export const resetNotify = async (req, res) => {
    try {
        const { id } = req.params ;
        const user = await User.findById(id);
        user.notifyCount = 0
        await user.save()

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: "Server Error" });
    }
};

export const deleteCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await User.findById(id);

        await Reservation.deleteMany({ centerId: center._id });
        await Coursework.deleteMany({ userId: center._id });

        await User.findByIdAndDelete(id);

        res.status(201).json({ message: 'تم حذف المركز وكل الحجوزات والدورات المرتبطة به' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};