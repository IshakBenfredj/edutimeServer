import mongoose from "mongoose";

const Scheme = mongoose.Schema 

const userSchema = new Scheme({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User', userSchema);

export default User