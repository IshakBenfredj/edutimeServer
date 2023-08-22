import User from "../models/User.js";

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