const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors()); // Allow requests from React frontend
app.use(express.json());

// Endpoint to generate secret and QR code
app.get("/generate-secret", (req, res) => {
  const secret = speakeasy.generateSecret({
    name: "MyApp (2FA)", // Name that will appear in Google Authenticator
  });

  // Generate a QR code to scan
  qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) {
      return res.status(500).json({ message: "Error generating QR code" });
    }
    console.log({
      secret: secret.base32, // Secret that will be saved for future verification
      qrCode: dataUrl, // QR code to display on frontend
    });
    res.json({
      secret: secret.base32, // Secret that will be saved for future verification
      qrCode: dataUrl, // QR code to display on frontend
    });
  });
});

// Endpoint to verify the token entered by the user
app.post("/verify-token", (req, res) => {
  const { token, secret } = req.body;
  console.log(token, secret, "veryfile token ");
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
  });
  console.log(verified, ":::::");
  if (verified) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
