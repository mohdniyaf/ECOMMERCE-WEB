import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
import { useAuth } from '../../context/store';
import { useNavigate } from 'react-router-dom';

function ShoppingCart({ product }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.items);
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [token]);

  const handleQuantityChange = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => 
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  // Function to delete an item from the cart
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/deleteCart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh cart data after deletion
      setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      // Optionally, update total amount after deleting an item
      const itemToDelete = cartItems.find(item => item._id === itemId);
      if (itemToDelete) {
        setTotalAmount(prevTotal => prevTotal - itemToDelete.product.price * itemToDelete.quantity);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <div>
      <div className="cart-border">
        <h3 className='cart-heading'>Shopping Cart</h3>
        <hr className='cart-border-hr'/>
        <div className='cart-cate-name'>
          <p className='cart-product-head-prod ps-3'>Product</p>
          <p className='cart-product-head-quan'>Quantity</p>
          <p className='cart-product-head-tot'>Subtotal</p>
        </div>
        <hr className='cart-border-hr' />
        <div className="cart-product-container">
          {cartItems.map((item) => (
            <div key={item._id}>
              <div className='cart-product'>
                <div className="cart-product-details">
                  <div className="cart-product-image">
                    <img src={item.product.images[0]?.url} alt={item.product.name} />
                  </div>
                  <div className="cart-product-content">
                    <p className='cart-content-name'>{item.product.name}</p>
                    <p className='cart-content-font'>
                      <i className="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>{item.product.price}
                    </p>
                    <select defaultValue={item.product.size}>
                      <option value="sm">SM</option>
                      <option value="lg">LG</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                    <p className='cart-content-font text-danger' onClick={() => handleRemoveItem(item.product._id)}>Remove</p>
                  </div>
                </div>
                <div className="cart-product-quantity">
                  <i className="fa-solid fa-minus" onClick={() => handleQuantityChange(item._id, -1)}></i>
                  <input type="number" disabled className='ms-2 quantity-desc' value={item.quantity} />
                  <i className="fa-solid fa-plus" onClick={() => handleQuantityChange(item._id, 1)}></i>
                </div>
                <div className="cart-product-subtotal">
                  <p>{item.product.price * item.quantity}</p>
                </div>
              </div>
              <hr className='cart-product-hr' />
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-between me-3 mt-4'>
          <button type="button" className="btn btn-dark san-font shadow-none" onClick={() => navigate('/')}>Continue Shopping</button>
          <h5 className='san-font'>Total Price: {totalAmount}</h5>
        </div>
        <div className='d-flex justify-content-end me-3'>
          <button type="button" className="btn btn-dark san-font shadow-none" onClick={() => navigate('/checkout')}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
