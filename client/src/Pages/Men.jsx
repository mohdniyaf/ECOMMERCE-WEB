import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import BottomBar from '../Components/Bottom Bar/BottomBar';
import MenBanner from '../Components/Banner/MenBanner';
import LoadCard from '../Components/Load Card/LoadCard';

function Men() {
  const [shirtData, setShirtData] = useState([]);
  const [pantData, setPantData] = useState([]);

  useEffect(() => {
    // Function to fetch data for "Shirts"
    const fetchShirtData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/products/MEN/Shirt`);
        setShirtData(response.data);
        console.log("Shirt data:", response.data);
      } catch (error) {
        console.error("Error fetching shirt products:", error);
      }
    };

    // Function to fetch data for "Pants"
    const fetchPantData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/products/MEN/Pant`);
        setPantData(response.data);
        console.log("Pant data:", response.data);
      } catch (error) {
        console.error("Error fetching pant products:", error);
      }
    };

    // Fetch data for each category
    fetchShirtData();
    fetchPantData();
  }, []);

  return (
    <div>
      <Navbar />
      <MenBanner />
      
      {/* LoadCard for Shirts */}
      <LoadCard title="Shirts" products={shirtData} />

      {/* LoadCard for Pants */}
      <LoadCard title="Pants" products={pantData} />

      <Footer />
      <BottomBar />
    </div>
  );
}

export default Men;
