import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: 'Unauthorized - No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.json({ success: false, message: 'Unauthorized - Token error' });
  }
};

export default authUser;