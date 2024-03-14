import { Info } from "../models/info.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';





const information = asyncHandler(async (req, res) => {
    const { phone, persnoal_email, tech, linkedin, github } = req.body;
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
    const user_exist = await Info.findOne({ user: user._id })
    // console.log(user_exist);
    if (user_exist) {
        throw new ApiError(400, "Your data alerady added")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload an image or avtar localpath is not found")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // console.log(avatar.url);
    if (!avatar) {
        throw new ApiError(400, "avtaar not upload on server")
    }

    const user_info = await Info.create({
        user: user._id,
        avatar: avatar.url,
        phone,
        persnoal_email,
        tech,
        linkedin,
        github
    })


    const created_info = await Info.findById(user_info._id);
    if (!created_info) {
        throw new ApiError(500, "something went wrong during information add");
    }
    const userid = await user_info.user

    const finduser = await User.findById(userid)
    console.log(finduser)

    return res.status(200).json(new ApiResponse(200, {}, "Information Added Successfully"))

})



export {
    information
}




