// src/utils/api.js
const API_BASE = 'https://fakestoreapi.com';

// Fetch categories from the API
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch products based on the category or all products
export const fetchProducts = async (category = '') => {
  try {
    const url = category 
      ? `https://fakestoreapi.com/products/category/${category}`
      : 'https://fakestoreapi.com/products';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch product details by product ID
export const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details");
  }
};
