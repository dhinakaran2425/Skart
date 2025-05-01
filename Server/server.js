import cookieParser from 'cookie-parser';
import express, { application, json, raw } from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRoutes from './routes/UseRoute.js';
import sellerRouter from './routes/SellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/ProductRoute.js';
import cartRouter from './routes/CartRoute.js';
import addressRouter from './routes/AddressRoute.js';
import orderRouter from './routes/OrderRoute.js';
import { stripeWebhook } from './controllers/OrderController.js';




const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173", "https://skart-foods.vercel.app/"];

app.post('/stripe', express.raw({type:'application/json'}),stripeWebhook)
await connectDB();
await connectCloudinary();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origins: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
    res.send('Api is running');
    }
);

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}
);