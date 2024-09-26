 
import axios from 'axios';
import    { useState } from 'react';
 

function App() {
 const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(null);
  // Function to generate the secret and QR code
  const generateSecret = async () => {
    try {
      const response = await axios.get('http://localhost:3001/generate-secret');
      setQrCode(response.data.qrCode); // Set QR code image
      setSecret(response.data.secret); // Save secret for token verification
    } catch (error) {
      console.error('Error generating secret:', error);
    }
  };

  // Function to verify the token entered by the user
  const verifyToken = async () => {
    try {
      const response = await axios.post('http://localhost:3001/verify-token', {
        token: token,
        secret: secret,
      });
      console.log(response,"data")
      setIsVerified(response.data.verified);
    } catch (error) {
      setIsVerified(false);
      console.error('Error verifying token:', error);
    }
  };

  console.log(isVerified,"secret",secret)

  return (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>2FA with Google Authenticator</h1>
      <button onClick={generateSecret}>Generate QR Code</button>

      {qrCode && (
        <div>
          <h3>Scan the QR Code with Google Authenticator:</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}

      {secret && (
        <div style={{ marginTop: '20px' }}>
          <h3>Enter the 6-digit token from Google Authenticator:</h3>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={verifyToken}>Verify Token</button>
        </div>
      )}

      {isVerified !== null && (
        <div style={{ marginTop: '20px' }}>
          {isVerified ? (
            <h3 style={{ color: 'green' }}>Token is valid! ma thông báo hợp lệ</h3>
          ) : (
            <h3 style={{ color: 'red' }}>Invalid token, please try again.</h3>
          )}
        </div>
      )}
    </div>
  )
}

export default App
