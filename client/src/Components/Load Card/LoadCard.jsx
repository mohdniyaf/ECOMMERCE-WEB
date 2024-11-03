import React, { useState, useEffect } from 'react';
import { slice, debounce } from 'lodash';
import axios from 'axios';
import { useAuth } from '../../context/store';
import { useNavigate } from 'react-router-dom';

function LoadCard({ title, products }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(5);
  const [initialPosts, setInitialPosts] = useState(slice(products, 0, index));
  const [isCompleted, setIsCompleted] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    setInitialPosts(slice(products, 0, index));
    setIsCompleted(index >= products.length);

    // Fetch wishlist items when component mounts
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getwishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data.items.map(item => item.product._id));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [index, products, token]);

  const loadMore = debounce(() => {
    if (index < products.length) {
      setIndex((prevIndex) => prevIndex + 5);
    }
  }, 200);

  const toggleWishlist = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        // Remove from wishlist
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/removewishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(wishlist.filter(id => id !== productId));
      } else {
        // Add to wishlist
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/addwishlist/${productId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <div>
      <div className="productCard-border pt-4 pb-3">
        <div className="">
          <h4 className="san-font">{title}</h4>
        </div>
        <div className="card-container">
          {initialPosts.map((obj) => (
            <div key={obj._id} className="card-box bg-light">
              <div className="d-flex justify-content-center">
                <div className="card-box-image-container">
                  <div className="card-image-box"
                    onClick={() => handleProductClick(obj._id)}>
                    <img
                      src={obj.images[0]?.url}
                      className="card-box-image cursor-p"
                      style={{ height: '251px', objectFit: 'cover' }}
                      alt={obj.name}
                      />
                    <div className="card-icon-cont">
                      <i
                        onClick={() => toggleWishlist(obj._id)}
                        className={`fa-heart cursor-p card-font-icon ${wishlist.includes(obj._id) ? 'fa-solid' : 'fa-regular'}`}
                        style={{ color: wishlist.includes(obj._id) ? '#FF5A5F' : '#000' }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-box-content">
                <p><strong>{obj.name}</strong></p>
                <p className="productCard-category">{obj.category}</p>
                <div className="d-flex justify-content-between">
                  <p className="productCard-price"><strong>₹ {obj.price}</strong></p>
                  <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        {initialPosts.length > 0 && !isCompleted && (
          <div className="d-flex justify-content-center mt-2">
            <button onClick={loadMore} type="button" className="btn btn-danger shadow-none">Load More +</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadCard;
