import React, { useState } from 'react';
import axios from 'axios';
import './CreateProduct.css';
import { useAuth } from '../../context/store';

function CreateProduct() {
  const { token } = useAuth(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryName', categoryName);  // updated here
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('stock', stock);
    sizes.forEach(size => formData.append('size', size));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/addProduct`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Product added successfully:', response.data);
      setName('');
      setDescription('');
      setCategoryName('');  // updated here
      setSubCategory('');
      setPrice('');
      setStock('');
      setSizes([]);
      setImages([]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      setSizes(sizes.filter(size => size !== value));
    }
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-6 col-md-7 col-sm-9 col-11'>
          <h2 className='login-font text-center'>Create Product!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input type="text" placeholder='Product name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="productName" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className='desc-text' rows={4} value={description} onChange={(e) => setDescription(e.target.value)} id="description"/>
            </div>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">Category</label>
              <input type="text" placeholder='Main Category' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" id="categoryName" /> {/* updated here */}
            </div>
            <div className="mb-3">
              <label htmlFor="subCategory" className="form-label">Sub Category</label>
              <select className="form-select" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose Sub Category</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Size</label>
              <div>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label key={size} className="me-2">
                    <input type="checkbox" value={size} onChange={handleSizeChange} checked={sizes.includes(size)} /> {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-3 d-flex">
              <div className='w-50'>
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" />
              </div>
              <div className='w-50 ms-3'>
                <label htmlFor="stock" className="form-label">Stock</label>
                <input type="number" placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} className="form-control" id="stock" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">Images</label>
              <input type="file" multiple onChange={handleImageChange} className="form-control" id="images" />
            </div>
            <button type="submit" className="btn form-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
