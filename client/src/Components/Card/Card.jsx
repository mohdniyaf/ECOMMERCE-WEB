import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import './Responsive.css';
import { useAuth } from '../../context/store';

function Card({ title }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getwishlist`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        setWishlistItems(response.data.items); 
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [token]); // Include token as a dependency

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/removewishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state to remove the item
      setWishlistItems((prevItems) => prevItems.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <div className="productCard-border pt-1 mt-0">
        <h4 className="san-font mt-0">{title}</h4>
        <hr className="w-100 m-0" />
        <div className="card-container">
          {wishlistItems.length === 0 ? (
            <div className="d-flex justify-content-center mt-4">
              <p className='san-font'>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.product._id} className="card-box bg-light">
                <div className="d-flex justify-content-center">
                  <div className="card-box-image-container">
                    <div className="card-image-box" onClick={() => handleProductClick(item.product._id)} >
                      <img
                        src={item.product.images[0]?.url} // Use actual image URL from the wishlist item
                        className="card-box-image"
                        alt=""
                      />
                      <div className="card-icon-cont">
                        <i 
                          onClick={() => handleRemoveFromWishlist(item.product._id)} // Call remove function on click
                          style={{ color: '#FF5A5F', cursor: 'pointer' }} 
                          className="fa-solid fa-heart cursor-p card-font-icon"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-box-content">
                  <p><strong>{item.product.name}</strong></p> {/* Assuming you have a name property */}
                  <p className="productCard-category">{item.category}</p> {/* Assuming you have a category property */}
                  <div className="d-flex justify-content-between">
                    <p className="productCard-price"><strong>₹ {item.product.price}</strong></p> {/* Assuming you have a price property */}
                    <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
