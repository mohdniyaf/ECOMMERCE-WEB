import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminAddProduct from '../Components/Add Product/AdminAllProduct';
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar';

function AddProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch product data
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/allProduct`);
        setProducts(response.data);
        console.log("Fetched product data:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <AdminAddProduct products={products} setProducts={setProducts} />
    </div>
  );
}

export default AddProduct;
