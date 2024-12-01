import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nike-clone')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});