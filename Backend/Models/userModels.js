import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    profilePic: {
        type: String,
        default: ""
    },
})

export const User = mongoose.model("User", userSchema);