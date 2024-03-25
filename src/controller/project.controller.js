import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Project } from "../models/project.model.js";

const addProject = asyncHandler(async (req, res) => {
    const user = await User.findById(
        req.user._id,
        {
            unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }
    const { project } = req.body;
    const projectAdded = await Project.findOne({ user: user._id })
    if (projectAdded) {
        const updatedProject = await Project.findByIdAndUpdate(projectAdded._id, {
            $push: { project }
        })
        console.log("updated");
    }
    else {
        const newProject = await Project.create({ user: user._id, project })
        console.log("created");
    }
    const projects = await Project.find({ user: user._id })
    return res.status(200).json(new ApiResponse(200, projects, "Project Added Successfully"))
})



export { addProject }