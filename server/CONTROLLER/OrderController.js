const Order = require('../MODEL/orderSchema');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  const { totalAmount, address, paymentMethod, items } = req.body;
  const {userId}=req.user.id;

  try {
      // Create Razorpay order
      const options = {
          amount: totalAmount, // smallest currency unit
          currency: 'INR',
          receipt: 'receipt_' + Math.random().toString(36).substring(7),
      };
      const razorpayOrder = await razorpay.orders.create(options);

      // Save order details in MongoDB
      const newOrder = new Order({
          userId,
          items,
          address,
          totalAmount,
          PaymentMethod: paymentMethod,
          paymentStatus: 'pending',  // Initial payment status
          orderStatus: 'pending',
          deliveryStatus: 'pending',
          createdAt: Date.now(),
      });
      
      await newOrder.save();

      res.status(200).json({
          razorpayOrder,
          orderId: newOrder._id,  // Pass MongoDB order ID for later updates
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


const verifyOrder = async (req, res) => {
  try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
          .update(sign.toString())
          .digest('hex');

      if (razorpay_signature === expectedSign) {
          // Update the order's payment status in MongoDB
          await Order.findByIdAndUpdate(orderId, {
              paymentStatus: 'completed',
              verify: true,
              totalPaid: true,
              deliveredAt: Date.now()
          });

          res.status(200).json({ message: 'Payment verified successfully' });
      } else {
          res.status(400).json({ error: 'Invalid payment signature' });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
      const order = await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
      res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, verifyOrder, updateOrderStatus };



module.exports={createOrder,verifyOrder};