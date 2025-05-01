import User from "../models/user.model.js"



export const updateCart = async (req, res) => {
    try {
        const {userId,cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Cart updated successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}