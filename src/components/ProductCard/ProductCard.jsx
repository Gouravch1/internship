// src/components/ProductCard/ProductCard.jsx
import React, { useState } from 'react';
import './ProductCard.css';
import { useDispatch } from 'react-redux'; // Importing useDispatch to dispatch Redux actions
import { addToCart } from '../../redux/cartSlice'; // Importing addToCart action

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(1);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }));
    handleCloseModal();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return <span className="rating-stars">{stars}</span>;
  };

  return (
    <>
      <div className="product-card">
        {product.isNew && <span className="badge new">NEW</span>}
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-meta">
            <span className="product-price">${product.price}</span>
            <div className="product-rating">
              <div className="stars">{'★'.repeat(Math.floor(product.rating.rate))}</div>
              <span className="review-count">({product.rating.count})</span>
            </div>
          </div>
          <button className="add-to-cart" onClick={handleOpenModal}>
            Add To Cart
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={product.image} alt={product.title} />
              </div>
              
              <div className="modal-info">
                <h3>{product.title}</h3>
                <p className="modal-price">${product.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <button 
                  className="buy-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
