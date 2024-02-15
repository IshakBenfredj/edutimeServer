import mongoose from "mongoose";

const Scheme = mongoose.Schema 

const userSchema = new Scheme({
    type : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true,
    },
    image : {
        type : String,
    },
    address : {
        type : String,
    },
    phone : {
        type : String,
    },
    likes : {
        type : [String],
        default: []
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    notifyCount: {
        type: Number,
        default: 0 
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User', userSchema);

export default User


