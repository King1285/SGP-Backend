import mongoose, { Schema } from "mongoose";


const infoSchema = new Schema({

}, { timestamps: true })



export const Info = mongoose.model("Info", infoSchema)