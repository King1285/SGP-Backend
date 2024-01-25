import mongoose, { Schema } from "mongoose";


const otpSchema = new Schema({
    email:{
        type:String,
        // ref:"User",
        required:true
    },
    otp:{
        type:Number,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
        required:true,
        get :(timestamp)=> timestamp.getTime(),
        set:(timestamp)=> new Date(timestamp)
    }
})


export const Otp = mongoose.model("Otp", otpSchema);