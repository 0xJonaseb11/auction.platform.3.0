const Product = require('../models/Product');

exports.getSellerInventory = async (req, res) => {
  try {
    // Assuming you have a user ID in the request object after authentication
    const userId = req.user._id;

    // Fetch products for the specific seller
    const inventory = await Product.find({ user: userId });

    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
