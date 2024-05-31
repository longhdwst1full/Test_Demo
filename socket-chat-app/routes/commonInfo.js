import express from "express";
const router = express.Router();

router.get("/web-info", commonInfoController.getWebInfo);
router.get("/google-captcha", commonInfoController.getGoogleCaptcha);

export default router;
