import Article from "../models/Article.js";

export const addArticle = async (req,res) => {
    try {
        const { description, title } = req.body;
        const { userId } = req.params;
        const image = req.file ? req.file.filename : '';
        const newArticle = new Article({
            title,
            description,
            userId,
            image
        });
        const savedArticle = await newArticle.save();
        res.status(201).json({
            message: 'تم إضافة المقال',
            article: savedArticle,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getArticles = async (req,res) => {
    try {
        const all_articles = await Article.find();
        const articles = all_articles.reverse()
    
        res.status(200).json({ articles });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getPostById = async (req,res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            res.status(404).json({ message: 'not found' });
        }
    
        res.status(200).json({ article });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// export const getAdminPost = async (req,res) => {
//     try {
//         const admin = await User.findOne({ typeOfUser : 'admin'});

//         if(admin) {
//             const post = await Post.findOne({ userId : admin._id});
//             res.status(200).json({ post });
//         } else {
//             res.status(200).json({ message:'no posts' });
//         }
    
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }

// export const removePost = async (req,res) => {
//     try {
//         const { postId } = req.params;
//         const post = await Post.findByIdAndRemove(postId);

//         res.status(200).json({ message : 'تم حذف المنشور',post });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }