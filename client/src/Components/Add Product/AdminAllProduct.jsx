import React from 'react';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminAddProduct({ products, setProducts }) { // Pass setProducts to update list
  const navigate = useNavigate();

  // Function to handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteProduct/${id}`);
      // Remove deleted product from the list by filtering it out
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className=''>
      <section className='add-product'>
        <h4 className='san-font'>Add Product</h4>
        <div className="d-flex justify-content-between">
          <div className='d-flex'>
            <input type="search" className="form-control" placeholder='Search' />
            <select className="form-select ms-2" aria-label="Default select example">
              <option selected>All Product</option>
              <option value="1">Shirt</option>
              <option value="2">Pant</option>
              <option value="3">T-Shirt</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary san-font" onClick={() => navigate('/admin/createProduct')}>
            + Create New
          </button>
        </div>
        <hr className='addProduct-hr' />

        <div className='addProduct-image-container'>
          {products.map((obj) => (
            <div className='addProduct-image-box bg-light' key={obj._id}>
              <div className='bg-light'>
                <img src={obj.images[0].url} alt={obj.name} className='bg-light'/>
              </div>
              <span className='image-box-content'>
                <span>{obj.name}</span>  <br />
                <span className='box-content-price'>
                  <i className="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>.{obj.price}
                </span>
                <br />
                <span className='d-flex justify-content-between'>
                  <button className='btn btn-light' type='button'>
                    <i className="fa-solid fa-pen addProduct-box-icon" style={{ color: 'silver' }}></i> Edit
                  </button>
                  <button className='btn btn-light' type='button' onClick={() => handleDelete(obj._id)}>
                    <i className="fa-solid fa-trash addProduct-box-icon" style={{ color: 'red' }}></i> Delete
                  </button>
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminAddProduct;
