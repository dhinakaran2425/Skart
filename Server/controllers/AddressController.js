import Address from "../models/address.model.js"




export const addAddress = async (req, res) => {
    try {
        const {userId, address} = req.body
        await Address.create({...address,userId})
        res.json({success: true, message: "Address added successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})       
    }
}

export const getAddress = async (req, res) => {
    try {
      const userId = req.userId; // ✅ From authUser middleware
      const addresses = await Address.find({ userId });
      res.json({ success: true, addresses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  