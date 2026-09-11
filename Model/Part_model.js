const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compatibleVehicleSchema = new Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  }
}, { _id: false });

const partSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Part name is required'],
    trim: true
  },
  partNumber: {
    type: String,
    required: [true, 'Part number is required'],
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true,
    default: 'Generic'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Engine', 'Brakes', 'Transmission', 'Electrical', 'Suspension', 'Body', 'Exhaust', 'Filters', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  compatibleVehicles: [compatibleVehicleSchema],
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

partSchema.index({ name: 'text', partNumber: 'text', brand: 'text' });

module.exports = mongoose.model('Part_model', partSchema);
