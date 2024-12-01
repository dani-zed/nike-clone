import mongoose from "mongoose";
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
  discountPrice: {
    type: Number
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
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    selectedClass: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  origin: {
    type: String
  },
  declaration: {
    type: String
  },
  marketedBy: {
    type: String
  },
  highlights: [{
    type: String
  }],
}, {
  timestamps: true
});

export default mongoose.model('Product',productSchema);
