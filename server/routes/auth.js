import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
router.post('/login',
    [
      body('email').isEmail(),
      body('password').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );
  
        res.json({
          token,
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty(),
    body('lastName').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation error', errors.array());
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User(req.body);
      console.log('User data received:', req.body);

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error('Error during registration:', error); // Log the error for more clarity
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  }
);
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/cart', auth, async (req, res) => {
  try {
    // Validate the cart format
    const { cart } = req.body;
    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: 'Cart must be an array' });
    }


    for (const item of cart) {
      if (
        !item.product ||
        !item.product._id ||
        !item.size ||
        !item.color ||
        !item.quantity ||
        item.quantity <= 0
      ) {
        return res.status(400).json({ message: 'Invalid cart item data' });
      }
    }

   
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's cart
    user.cart = cart;

   
    await user.save();

  
    res.json(user.cart);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
});

 export default router;
