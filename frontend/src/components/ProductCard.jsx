import React from 'react'

function ProductCard({ imagePath, setAlt, setPrice, setDescription }) {
  return (
    <div>
      <div className="product-card">
        <img src={ imagePath } alt={ setAlt } />
        <div className="product-price">{ setPrice }</div>
        <div className="product-description">{ setDescription }</div>
      </div>
    </div>
  )
}

export default ProductCard;
