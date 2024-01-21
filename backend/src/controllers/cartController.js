const Cart = require('../models/Cart');

const cartController = {
  addItemToCart: async (req, res) => {
    try {
      const { userId, name, price } = req.body;

      // Check if the user has an existing cart
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // If the user doesn't have a cart, create a new one
        cart = new Cart({ userId, items: [] });
      }

      // Ensure that the cart has the 'items' property
      if (!cart.items) {
        cart.items = [];
      }

      // Check if the product already exists in the cart
      const existingItem = cart.items.find(item => item.name === name);

      if (existingItem) {
        // If the product exists, update the quantity or other details
        existingItem.quantity += 1; // Assuming quantity is always incremented by 1
      } else {
        // If the product doesn't exist, add a new item to the cart
        cart.items.push({ name, price, quantity: 1 });
      }

      // Save the updated cart
      await cart.save();

      res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeItemFromCart: async (req, res) => {
    try {
      const { userId, name } = req.body;

      // Find the user's cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found for the user' });
      }

      // Remove the specified product from the cart
      cart.items = cart.items.filter(item => item.name !== name);

      // Save the updated cart
      await cart.save();

      res.json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  viewCart: async (req, res) => {
    try {
      const { userId } = req.query;

      // Find the user's cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found for the user' });
      }

      res.json(cart);
    } catch (error) {
      console.error('Error viewing cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;
