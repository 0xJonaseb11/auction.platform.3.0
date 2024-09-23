// server/models/Product.js
const mongoose = require('mongoose');

const bidHistorySchema = new mongoose.Schema({
  bidderName: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  bidTimestamp: { type: Date, default: Date.now },
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  minBidAmount: { type: Number, required: true },
  imageUrl: {type: String, required: true,},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Add more fields as needed

  bidHistory: [bidHistorySchema],
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
