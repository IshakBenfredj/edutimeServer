import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    image : String,
    userId: mongoose.Schema.Types.ObjectId,
    likes:{
        type: [ String ],
        default: []
    },
    disLikes:{
        type: [ String ],
        default: []
    },
},{timestamps: true});

const Article = mongoose.model('Article', articleSchema);

export default Article