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
        required : true
    },
    image : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    likes : {
        type : [String],
        default: []
    },
    commentsCount: {
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