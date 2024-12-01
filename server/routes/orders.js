import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();
// const Razorpay = require('razorpay')
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new order and get Razorpay order ID
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    const options = {
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      user: req.userId,
      items,
      totalAmount,
      shippingAddress,
      orderId: razorpayOrder.id
    });

    await order.save();

    res.json({
      orderId: razorpayOrder.id,
      amount: options.amount,
      currency: options.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment signature
router.post('/verify', auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const order = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          status: 'completed',
          paymentId: razorpay_payment_id
        },
        { new: true }
      );

      res.json({ success: true, order });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;