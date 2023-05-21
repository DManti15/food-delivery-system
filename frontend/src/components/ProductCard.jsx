import React from "react";

import "../styles/ProductCard.css";

function ProductCard({ className, imagePath, setAlt, setPrice, setName, setDescription }) {
  return (
    <div className={ className }>
      <div className="product-card">
        <div className="image-wrapper">
          <img src={imagePath} alt={setAlt} className="product-image" />
        </div>
        <div className="product-price">{setPrice}</div>
        <div className="product-details">
          <h3 className="product-name">{setName}</h3>
          <p className="product-description">{setDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
