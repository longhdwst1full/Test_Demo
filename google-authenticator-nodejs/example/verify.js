const dotenv = require("dotenv");
const speakeasy = require("speakeasy");
dotenv.config();

const key = "process0env0SECRET_KEY"

function verifyOTP(otp) {
  const verified = speakeasy.totp.verify({
    secret: key,
    encoding: "base32",
    token: otp,
  });

  return verified;
}

module.exports = verifyOTP;
