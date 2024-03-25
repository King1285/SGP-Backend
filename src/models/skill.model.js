import mongoose, { Schema } from 'mongoose';


const skillSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skill: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
},
    { timestamps: true }
)


export const Skill = mongoose.model("Skill", skillSchema)
