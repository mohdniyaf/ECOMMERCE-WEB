const Order = require('../MODEL/orderSchema');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
    const { totalAmount, address, paymentMethod } = req.body;
    try {
        const options = {
          amount: totalAmount, // amount in the smallest currency unit
          currency: 'INR',
          receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
    
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    
};

const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET')
                                .update(sign.toString())
                                .digest('hex');
    
        if (razorpay_signature === expectedSign) {
          // Payment is verified
          res.status(200).json({ message: 'Payment verified successfully' });
        } else {
          res.status(400).json({ error: 'Invalid payment signature' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};


module.exports={createOrder,verifyOrder};