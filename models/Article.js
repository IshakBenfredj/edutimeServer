import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    image : String,
    userId: String,
    likes:[ String ],
},{timestamps: true});

const Article = mongoose.model('Article', articleSchema);

export default Article