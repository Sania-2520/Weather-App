import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const url =
        category === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${category}`;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get('https://fakestoreapi.com/products/categories');
    setCategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [category]);

  return (
    <div>
      <h2>Products</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}`}><button>View</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
