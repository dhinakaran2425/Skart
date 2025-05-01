import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
   try {
    const { email, password } = req.body;
   if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
       const token = jwt.sign({email}, process.env.JWT_SECRET, {
           expiresIn: '30d'
       });
       res.cookie('sellerToken', token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production',
           sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
           maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
       });
       return res.json({success:true, message: 'Login successful'});
   }else{
         return res.json({success:false, message: 'Invalid credentials'});
   }
   } catch (error) {
         console.error(error);
         res.json({ success:false ,message: 'Internal server error' });
    
   }
}

export const issellerAuth= async (req, res) => {
    try {
            return res.json({ success: true})
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        });
        return res.json({success: true, message: 'Logged out successfully'});
    } catch (error) {
        console.error(error);
        return res.json({ success:false ,message: 'Internal server error' });
    }
}