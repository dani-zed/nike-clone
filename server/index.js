import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/orders', orderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://danidude67_db_user:netsetter123@cluster0.7nkyxez.mongodb.net/?appName=Cluster0', )
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});