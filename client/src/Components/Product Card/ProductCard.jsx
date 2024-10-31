import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/store';

function ProductCard({ title }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/allProduct`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId,quantity) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/addCart`,
        { productId,quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
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
                      <i className="fa-regular fa-heart cursor-p card-font-icon"></i> 
                   {/* <i style={{ color: '#FF5A5F' }} className="fa-solid fa-heart cursor-p card-font-icon"></i> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-box-content ">
                <p><strong>{product.name}</strong></p>
                <p className="productCard-category">{}</p>
                <div className="d-flex justify-content-between">
                  <p className="productCard-price"><strong>₹ {product.price}</strong></p>
                  <i
                    className="fa-solid fa-cart-plus productCard-cart cursor-p"
                    
                    onClick={() => {const quantity=1;handleAddToCart(product._id,quantity)}}
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
