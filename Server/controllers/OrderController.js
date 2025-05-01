import { model } from "mongoose"
import Order from "../models/Order.model.js"
import Product from "../models/product.model.js"
import stripe from "stripe"
import User from "../models/user.model.js"



export const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items, address} = req.body
        if(!address || items.length === 0) {
            res.json({success: true, message: "Invalid Data"})
        }
        let amount = 0;

for (const item of items) {
  const product = await Product.findById(item.product);
  if (!product || typeof product.offerPrice !== "number") {
    return res.status(400).json({ success: false, message: "Invalid product or price" });
  }
  amount += product.offerPrice * item.quantity;
}

amount += Math.floor(amount * 0.02); // add 2% fee or tax

        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
        })
        res.json({success: true, message: "Order placed successfully", order})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, address} = req.body;
        const {origin} = req.headers;
        if(!address || items.length === 0) {
            res.json({success: true, message: "Invalid Data"})
        }

        let productData=[];

        let amount = 0;

for (const item of items) {
  const product = await Product.findById(item.product);
  productData.push({
    name:product.name,
    price:product.offerPrice,
    quantity:item.quantity
  })
  if (!product || typeof product.offerPrice !== "number") {
    return res.status(400).json({ success: false, message: "Invalid product or price" });
  }
  amount += product.offerPrice * item.quantity;
}

amount += Math.floor(amount * 0.02); // add 2% fee or tax

        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "Online",
        })

        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
        const line_items = productData.map((item)=>{
            return{
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity:item.quantity
            }
        })

        const session=await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=myorders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,
            },
            billing_address_collection: "required"
        })

        res.json({success: true, url: session.url})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export const stripeWebhook = async (request,response)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
    const sig =request.headers["stripe-signature"]
    let event;
    try {
        event= stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        response.status(400).send(`Webhook Error : ${error.message}`) 
    }
    switch(event){
        case "payment_intent.succeeded":{
            const paymentIntent=event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })
            const{orderId, userId} = session.data[0].metadata;
            await Order.findByIdandUpdate(orderId,{isPaid:true})
            await User.findByIdandUpdate(userId,{cartItems:{}})
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })
            const{orderId} = session.data[0].metadata;
            await Order.findByIdandDelete(orderId)
            break;
    }
    default:
        console.log(`Unhandled event type ${event.type}`)
        break;
}
response.json({received:true})
}


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const orders = await Order.find({ userId })
            .populate('items.product')
            .populate('address')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Get user orders error:', error);
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{paymentType:"Online"}]
        }).populate("items.product address").sort({createdAt: -1})
        res.json({success: true, orders})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
