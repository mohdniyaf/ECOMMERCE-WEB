import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckoutPayment.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/store';

function CheckoutPayment() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);  // For storing total cart amount

    useEffect(() => {
        // Fetch addresses from backend
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

        // Fetch cart data and calculate total amount
        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const cartItems = response.data.totalAmount;
                setCartTotalAmount(cartItems);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchAddresses();
        fetchCartData();
    }, [token]);

    const handleEdit = (addressId) => {
        navigate(`/editAddress/${addressId}`);
    };

    const handleDelete = async (addressId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/deleteAddress/${addressId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(addresses.filter((address) => address._id !== addressId));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <div className='checkout-border'>
            <h2 className='san-font'>CheckOut</h2>
            <div>
                <div className="row">
                    <div className="col-lg-8 col-md-7 ">
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
                                    <input type="radio" name='address' />
                                    <div>
                                        <p>
                                            {add.firstName} {add.lastName} <br />
                                            {add.phone} <br />
                                            {add.addressDetail} <br />
                                            {add.landmark} <br />
                                            {add.state} <br />
                                            {add.zip}
                                        </p>
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
                    <div className="col-lg-4 mt-1 col-md-5 bg-light ">
                        <div>
                            <p className='san-font'>Payment Details:</p>
                            <input type="radio" name='payment' />
                            <label className='ps-3'>Cash on Delivery</label><br />
                            <input type="radio" name='payment' />
                            <label className='ps-3'>RazorPay</label>
                        </div>
                        <div>
                            <br />
                            <p className="order-summary ">Order Summary:</p>
                            <div className="d-flex justify-content-between">
                                <p className="san-font pe-5 m-0">Order Total</p>
                                <p className='m-0'>{cartTotalAmount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="san-font pe-5 m-0">Shipping</p>
                                <p className='m-0'>0.00</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="san-font pe-5 m-0"><strong>Total</strong></p>
                                <p className='m-0'>{cartTotalAmount}</p>
                            </div>
                            <button type="button" className="btn btn-dark w-100 san-font mt-2 shadow-none">
                                Purchase Rs.{cartTotalAmount}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPayment;
