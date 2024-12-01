import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);