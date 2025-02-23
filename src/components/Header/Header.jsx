// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { toggleCart } from '../../redux/cartSlice'; // Importing Redux actions
import { fetchCategories } from '../../utils/api';
import './Header.css';

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header-left">
        <h1>Harmoni</h1>
        <nav>
          <a href="/">Home Page</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>

      <div className="header-right">
        <div className="cart" onClick={() => dispatch(toggleCart())}>
          <span>🛒</span>
          <span className="cart-count">{cartCount}</span>
        </div>
        <div className="account">👤</div>
      </div>
    </header>
  );
};

export default Header;
