import React from 'react';


function ProductCard() {
  return (
    <div>
      <div className="productCard-border">
        <div className="d-flex justify-content-center">
           <h4 className="san-font">Featured Product</h4>
        </div>
        <div className="card-container">

          <div className="card-box bg-light">
            <div className="d-flex justify-content-center">
              <div className="card-box-image-container">
                <div className="card-image-box">
                  <img
                    src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493"
                    className="card-box-image"
                    alt=""
                  />
                  <div className="card-icon-cont">
                    <i className="fa-regular fa-heart cursor-p card-font-icon"></i>
                    {/* if item is added to Wishlist */}
                    {/* <i style={{color:'#FF5A5F'}} className="fa-solid fa-heart cursor-p card-font-icon"></i> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-box-content">
              <p><strong>Shirt</strong></p>
              <p className="productCard-category">Men</p>
              <div className="d-flex justify-content-between">
                <p className="productCard-price"><strong>₹ 9000</strong></p>
                <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
              </div>
            </div>
          </div>

          <div className="card-box bg-light">
            <div className="d-flex justify-content-center">
              <div className="card-box-image-container">
                <div className="card-image-box">
                  <img
                    src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493"
                    className="card-box-image"
                    alt=""
                  />
                  <div className="card-icon-cont">
                    {/* if item is not in wishlist */}
                    {/* <i className="fa-regular fa-heart cursor-p card-font-icon"></i> */}

                    {/* if item is added to Wishlist */}
                    <i style={{color:'#FF5A5F'}} className="fa-solid fa-heart cursor-p card-font-icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-box-content">
              <p><strong>Shirt</strong></p>
              <p className="productCard-category">Men</p>
              <div className="d-flex justify-content-between">
                <p className="productCard-price"><strong>₹ 9000</strong></p>
                <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
              </div>
            </div>
          </div>

          <div className="card-box bg-light">
            <div className="d-flex justify-content-center">
              <div className="card-box-image-container">
                <div className="card-image-box">
                  <img
                    src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493"
                    className="card-box-image"
                    alt=""
                  />
                  <div className="card-icon-cont">
                    <i className="fa-regular fa-heart cursor-p card-font-icon"></i>
                    {/* if item is added to Wishlist */}
                    {/* <i style={{color:'#FF5A5F'}} className="fa-solid fa-heart cursor-p card-font-icon"></i> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-box-content">
              <p><strong>Shirt</strong></p>
              <p className="productCard-category">Men</p>
              <div className="d-flex justify-content-between">
                <p className="productCard-price"><strong>₹ 9000</strong></p>
                <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
