import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { changePassword, forgotPassword, loginUser, logoutUser, refreshAccessToken, registerUser, sendOtp, sendOtpforForgotPassword, verifyOtp, verifyOtpForForgotPassword } from "../controller/user.controller.js";
import { information } from "../controller/info.controller.js"
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-send-otp").post(sendOtpforForgotPassword);
router.route("/forgot-verify-otp").post(verifyOtpForForgotPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/change-password").post(verifyJWT, changePassword);

router.route("/add-info").post(verifyJWT,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }]),
        information
)



export default router;