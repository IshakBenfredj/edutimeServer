import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  dotenv  from "dotenv";
import User from '../models/User.js';
import sendMail from '../middlewares/nodemailer.js';
dotenv.config();

const createToken = ( _id ) => {
    return jwt.sign({ _id }, process.env.SECRET);
};

export const confirmEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({ error: "هذا البريد الإلكتروني مستعمل بالفعل" });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const message = 'السلام عليكم , هذا هو الرمز الخاص بك لتأكيد البريد الإلكتروني خاصتك'
        const title = 'Confirm Email'
        sendMail(email,code,title,message)

        res.status(201).json({ code });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};

export const emailVerify = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "هذا البريد غير موجود!" });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const message = 'السلام عليكم , هذا هو الرمز الخاص بك لتأكيد البريد الإلكتروني خاصتك من أجل تغيير كلمة السر خاصتك'
        const title = 'Reset Password'
        sendMail(email,code,title,message)

        res.status(201).json({ code, user });
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password, id } = req.body;

        const user = await User.findById( id );
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword
        await user.save()

        res.status(201).json({ message: 'تم تغيير كلمة السر بنجاح' });
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const signup = async (req, res) => {
    try {
        const formData = req.body
        const file = req.file
        formData.image = file.filename

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.password, salt);
        formData.password = hashedPassword
        const newUser = User.create(formData);

        res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
    } catch (error) {
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "مستخدم غير موجود" });
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ error: " البريد الإلكتروني أو كلمة السر غير صحيحة" });
        }

        const token = createToken(user._id);
        delete user.password;
        res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ error: "خطأ بالسيرفر,حاول مجددا" });
    }
};