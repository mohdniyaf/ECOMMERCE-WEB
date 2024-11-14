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
            amount: totalAmount, // Razorpay accepts amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
        
        const order = await razorpay.orders.create(options);
        

        const newOrder = new Order({
            userId: req.user._id,
            items: req.user.cart.items, // Assuming user's cart items are populated
            address: address,
            totalprice: totalAmount,
            paymentStatus: 'Pending',
            PaymentMethod: paymentMethod,
            orderStatus: 'Created'
        });

        await newOrder.save();
        res.json(order);
    } catch (error) {
        console.error("Order creation error:", error); // Add more detailed logging
        res.status(500).json({ message: 'Error creating Razorpay order', error });
    }
    
};

const verifyOrder = async (req, res) => {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        await Order.updateOne({ "razorpay_order_id": order_id }, {
            paymentStatus: "Paid",
            orderStatus: "Confirmed",
            razorpay_payment_id
        });
        res.json({ success: true, message: "Payment verified successfully." });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed." });
    }
};


module.exports={createOrder,verifyOrder};