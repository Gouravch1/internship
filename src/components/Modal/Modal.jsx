// src/components/Modal/Modal.jsx
import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { fetchProductDetails } from '../../utils/api'; // Fetching product details from API
import './Modal.css'; // Importing styles for the modal

const Modal = ({ productId, closeModal }) => {
  const [product, setProduct] = useState(null); // Local state for product details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await fetchProductDetails(productId); // Fetching product details by ID
        setProduct(productDetails); // Updating the state with fetched data
      } catch (error) {
        console.error(error); // Handling errors if API fails
      }
    };
    fetchData(); // Calling the fetchData function
  }, [productId]); // Re-fetch when productId changes

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {product ? ( // Checking if the product data is available
          <>
            <h2>{product.title}</h2> {/* Product title */}
            <img src={product.image} alt={product.title} /> {/* Product image */}
            <p>{product.description}</p> {/* Product description */}
            <p>{`Price: $${product.price}`}</p> {/* Product price */}
            <button onClick={closeModal}>Close</button> {/* Close button */}
          </>
        ) : (
          <p>Loading...</p> // Display loading if product data is not available
        )}
      </div>
    </div>
  );
};

export default Modal; // Exporting the Modal component
