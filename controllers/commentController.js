import Comment from '../models/Comment.js'

export const addComment = async (req, res) => {

    try {
        const {comment, id} = req.body;
        const commentObj = {}
        commentObj.userId = req.user._id
        commentObj.id = id
        commentObj.comment = comment
        Comment.create(commentObj);
        res.status(201).json({ message: "تم التعليق" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ بالسيرفر" });
    }
}

export const getComments = async (req, res) => {
    try {
        const allComments = await Comment.find();
        const comments = allComments.reverse()

    res.status(201).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        await Comment.findByIdAndDelete(id)
        res.status(201).json({ message : 'تم حذف التعليق' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ بالسيرفر' });
    }
}