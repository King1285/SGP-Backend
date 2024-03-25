import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Skill } from "../models/skill.model.js";


const addSkill = asyncHandler(async (req, res) => {
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
    const { skill } = req.body;
    const s = await Skill.findOne({ user: user._id })
    let s1;
    if (s) {
        s1 = await Skill.findByIdAndUpdate(s._id,
            {
                $push: { skill }

            })
        console.log("Updated");
    }
    else {
        s1 = await Skill.create({ user: user._id, skill })
        console.log("Created");

    }
    // console.log(skill)
    // const skill  = await Skill.fi
    return res.status(200).json(new ApiResponse(200, s1, "Skill Added Successfully"))


})

const getSkill = asyncHandler(async (req, res) => {

    
})



export { addSkill }