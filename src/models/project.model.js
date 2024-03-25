import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            },

        }
    ]
},
{ timestamps: true }
)

export const Project = mongoose.model("Project",projectSchema);

