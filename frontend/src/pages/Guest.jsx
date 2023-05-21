import { ShoppingCart } from "phosphor-react";
import React, { useState } from "react";

import IMAGES from "../assets/images/index.js";
import Modal from "../components/Modal.jsx";
import OrderForm from "../components/OrderForm.jsx";
import ProductCard from "../components/ProductCard.jsx";

import "../styles/Guest.css";

function Guest() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [imageSrc, setImageSrc] = useState(IMAGES.products.hiC_Drink);

  const handleClick = () => {
    setClicks(clicks + 1);

    if (clicks === 19) {
      setImageSrc(IMAGES.products.hiC_Chiquito_EE);
    }
  };

  return (
    <div onClick={handleClick}>
      <nav className="navbar">
        <img
          src={IMAGES.logos.mtLogo}
          alt="Mission Trip ministry logo"
          className="mtLogo-nav"
        />
        <button className="cart-button">
          <ShoppingCart
            className="cart-icon"
            color="currentColor"
            size="64px"
            onClick={() => setIsOpen(true)}
          />
        </button>
      </nav>
      <div className="title">
        <h1>Hi Missionary!</h1>
        <h2>
          Let's <span className="blue-text">eat</span> something.
        </h2>
      </div>
      <div className="products-grid">
        <ProductCard
          className="hi-c"
          imagePath={imageSrc}
          setPrice="C$25"
          setName="Hi-C Te"
        />
        <ProductCard
          className="hotdog"
          imagePath={IMAGES.products.hotDog}
          setPrice="C$35"
          setName="Hot Dog"
        />
        <ProductCard
          className="rapidita"
          imagePath={IMAGES.products.rapiditaXd}
          setPrice="C$30"
          setName="Rapiditas"
        />
        <ProductCard
          className="mission-muffin"
          imagePath={IMAGES.products.missionMuffin}
          setPrice="C$50"
          setName="Mission Muffin"
        />
        <ProductCard
          className="grilled-cheese"
          imagePath={IMAGES.products.grilledCheese}
          setPrice="C$25"
          setName="Grilled Cheese"
        />
        <ProductCard
          className="sandwich"
          imagePath={IMAGES.products.sandwich}
          setPrice="C$30"
          setName="Sandwich"
        />
        <ProductCard
          className="donuts"
          imagePath={IMAGES.products.donut}
          setPrice="C$25"
          setName="Donuts"
        />
        <ProductCard
          className="canned-soda"
          imagePath={IMAGES.products.cannedSoda}
          setPrice="C$30"
          setName="Soda"
        />
        <ProductCard
          className="churros"
          imagePath={IMAGES.products.churros}
          setPrice="C$20"
          setName="Churros"
        />
      </div>
      <OrderForm setCartItems={setCartItems}/>
      {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} setCartItems={setCartItems}/>}
    </div>
  );
}

export default Guest;
