// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import ProductCard from '../../components/ProductCard/ProductCard'; // Importing ProductCard component
import Modal from '../../components/Modal/Modal'; // Importing Modal component
import { fetchProducts, fetchCategories } from '../../utils/api'; // API utility for fetching data
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from Redux
import { addToCart } from '../../redux/cartSlice'; // Importing addToCart action
import './Home.css'; // Importing styles for the Home page

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-left">
          <span className="hero-label">Welcome to</span>
          <h1>Discover Your Style</h1>
          <h2>Premium Shopping Experience</h2>
          <p>Explore our curated collection of premium products. From fashion to electronics, find everything you need with exclusive deals and fast delivery.</p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-shop">Shop Now</button>
            <button className="btn-learn">
              <span>Watch Video</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <div className="hero-image">
              <img src="https://i.pinimg.com/736x/32/bb/a8/32bba8ca7b87e0d387ec4f869ebb79ed.jpg" alt="Featured Products" />
            </div>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-container">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="product-header">
          <h2>{selectedCategory ? `${selectedCategory} Products` : 'All Products'}</h2>
          <p>{filteredProducts.length} products found</p>
        </div>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💬</div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="feature">
          <div className="feature-icon">✓</div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
