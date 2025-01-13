import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/meal.scss';
import { SpinnerDotted } from 'spinners-react'; // Spinnerni import qilish

const MealMain = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loader holati
  const [error, setError] = useState(null); // Xatolik holati uchun

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://project06.onrender.com/category");
      if (!response.ok) {
        throw new Error('Manzilga murojaat qilishda muammo bo\'ldi');
      }
      const data = await response.json();
      console.log('API Response:', data); // API javobini konsolga chiqaradi
      console.log('Fetched Categories:', data.data.categories);
      setCategories(data.data.categories || []); // Agar categories mavjud bo'lmasa bo'sh array qaytariladi
    } catch (error) {
      console.error('Fetch Error:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Loader tugatish
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Ketgan har safar yangi category yaratish paytida

  if (loading) {
    return (
      <div className="loading-container">
        <SpinnerDotted size={60} thickness={180} speed={140} color="#36d7b7" />
      </div>
    ); // Loader holati
  }

  if (error) {
    return <p>Xato: {error}</p>; // Xatolik haqida xabar
  }

  return (
    <div className='container'>
      <div className="meal-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="meal-card" key={category._id}>
              <Link to={`/meal-detail/${category._id}`}> {/* Pass the category ID */}
                <img src={category.image_url} className="meal-image" alt={category.en_name} />
                <div className="meal-name">{category.en_name}</div>
              </Link>
            </div>
          ))
        ) : (
          <p>Kategoriya mavjud emas.</p> 
        )}
      </div>
    </div>
  );
};

export default MealMain;
