import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/store';

function ProductCard({ title }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/allProduct`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

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

    fetchProducts();
    fetchWishlist();
  }, [token]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/addCart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleWishlistToggle = async (productId) => {
    if (wishlist.includes(productId)) {
      // Remove from wishlist
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/removewishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(wishlist.filter(id => id !== productId));
        console.log("Product removed from wishlist");
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
      }
    } else {
      // Add to wishlist
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/addwishlist/${productId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist([...wishlist, productId]);
        console.log("Product added to wishlist");
      } catch (error) {
        console.error("Error adding product to wishlist:", error);
      }
    }
  };

  return (
    <div>
      <div className="productCard-border">
        <div className="d-flex justify-content-center">
          <h4 className="san-font">{title}</h4>
        </div>
        <div className="card-container">
          {products.map((product) => (
            <div className="card-box bg-light" key={product._id}>
              <div className="d-flex justify-content-center">
                <div className="card-box-image-container">
                  <div className="card-image-box">
                    <img
                      src={product.images[0]?.url}
                      className="card-box-image cursor-p"
                      alt={product.images[0]?.altText || product.name}
                      onClick={() => handleProductClick(product._id)}
                    />
                    <div className="card-icon-cont">
                      <i
                        className={`cursor-p card-font-icon ${
                          wishlist.includes(product._id)
                            ? 'fa-solid fa-heart'  // Added to wishlist icon
                            : 'fa-regular fa-heart' // Not added to wishlist icon
                        }`}
                        style={{ color: wishlist.includes(product._id) ? '#FF5A5F' : 'inherit' }}
                        onClick={() => handleWishlistToggle(product._id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-box-content">
                <p><strong>{product.name}</strong></p>
                <p className="productCard-category">{product.category}</p>
                <div className="d-flex justify-content-between">
                  <p className="productCard-price"><strong>₹ {product.price}</strong></p>
                  <i
                    className="fa-solid fa-cart-plus productCard-cart cursor-p"
                    onClick={() => handleAddToCart(product._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
