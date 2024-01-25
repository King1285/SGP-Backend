import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, refreshAccessToken, registerUser, sendOtp, verifyOtp } from "../controller/user.controller.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)




export default router;