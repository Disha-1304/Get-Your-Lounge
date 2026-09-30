const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const JWT_SECRET = process.env.JWT_SHARED_SECRET || process.env.JWT_SECRET || 'parent_app_jwt_secret_dev_key';

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'No token provided' });

    // @react-oauth/google's useGoogleLogin hook returns an access_token.
    // We use it to fetch the user's profile information from Google.
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!userInfoRes.ok) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    const userInfo = await userInfoRes.json();
    const { email, name } = userInfo;

    // Find or create the user in our database
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name },
    });

    // Issue our own JWT token for subsequent API calls
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

module.exports = { googleLogin };
