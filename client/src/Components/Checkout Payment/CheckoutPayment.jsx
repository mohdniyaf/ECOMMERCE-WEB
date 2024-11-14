import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckoutPayment.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/store';

function CheckoutPayment() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/address`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data.items);
                setCartTotalAmount(response.data.totalAmount);
                console.log(response.data.items);

            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchAddresses();
        fetchCartData();
    }, [token]);

    const handlePurchase = async () => {
        if (!selectedAddress) {
            alert("Please select a shipping address.");
            return;
        }

        if (paymentMethod === 'RazorPay') {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/order/create`,
                    {
                        totalAmount: cartTotalAmount * 100, // Convert to smallest unit
                        address: selectedAddress,
                        paymentMethod: paymentMethod,
                        items:cartItems, // Add the items from the cart
                        userId: 'currentUserId' // Replace with actual user ID
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const { razorpayOrder, orderId } = response.data;

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: "Your Shop Name",
                    description: "Order Payment",
                    order_id: razorpayOrder.id,
                    handler: async function (response) {
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                        await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/api/user/order/verify`,
                            { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        alert("Payment Successful!");
                        navigate('/orders');
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.on("payment.failed", function (response) {
                    console.error("Payment failed:", response);
                    alert("Payment failed. Please try again.");
                });
                rzp.open();
            } catch (error) {
                console.error('Error processing Razorpay payment:', error);
                alert('There was an error processing your payment. Please try again later.');
            }
        } else {
            alert("Order placed with Cash on Delivery.");
            navigate('/order/success');
        }
    };

    return (
        <div className='checkout-border'>
            <h2 className='san-font'>CheckOut</h2>
            <div>
                <div className="row">
                    <div className="col-lg-8 col-md-7">
                        <div className="d-flex justify-content-between shipping-detail-cont">
                            <p className='shipping-detail-name'>Shipping details</p>
                            <p className='san-font text-primary cursor-p' onClick={() => navigate('/addAddress')}>
                                <strong>+ </strong> Add new address
                            </p>
                        </div>
                        <hr className="w-100 check-header-hr" />
                        <div className="shipping-address-cont">
                            {addresses.map((add) => (
                                <div className="shipping-address-box" key={add._id}>
                                    <input
                                        type="radio"
                                        name="address"
                                        onChange={() => setSelectedAddress(add)}
                                    />
                                    <div>
                                        <p>{add.firstName} {add.lastName} <br /> {add.phone} <br />
                                            {add.addressDetail} <br /> {add.landmark} <br />
                                            {add.state} <br /> {add.zip}</p>
                                        <div className="d-flex">
                                            <p className="san-font text-primary cursor-p" onClick={() => handleEdit(add._id)}>
                                                Edit Address
                                            </p>
                                            <p className="san-font ps-3 text-danger cursor-p" onClick={() => handleDelete(add._id)}>
                                                Delete
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr className="w-100 check-header-hr" />
                        </div>
                    </div>
                    <div className="col-lg-4 mt-1 col-md-5 bg-light">
                        <p className='san-font'>Payment Details:</p>
                        <input type="radio" name='payment' onChange={() => setPaymentMethod("COD")} />
                        <label className='ps-3'>Cash on Delivery</label><br />
                        <input type="radio" name='payment' onChange={() => setPaymentMethod("RazorPay")} />
                        <label className='ps-3'>RazorPay</label>
                        <div className="d-flex justify-content-between mt-4">
                            <p className="san-font pe-5 m-0">Order Total</p>
                            <p className='m-0'>{cartTotalAmount}</p>
                        </div>
                        <button type="button" className="btn btn-dark w-100 san-font mt-2 shadow-none" onClick={handlePurchase}>
                            Purchase Rs.{cartTotalAmount}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPayment;
