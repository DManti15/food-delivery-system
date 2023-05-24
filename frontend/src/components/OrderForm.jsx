import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

import axiosAPI from "../api/axiosAPI";
import { customStyles, options } from "../assets/selectorStyles";

import "../styles/OrderForm.css";

export default function OrderForm({ setCartItems }) {

  const endpoint = '/api/addToCart'
  const navigate = useNavigate()

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [customer, setCustomer] = useState("guest");
  const [delivery, setDelivery] = useState(false);

  const handleFoodChange = (selectedOption) => {
    setFood(selectedOption);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await axiosAPI.post(endpoint, {product_name: food.value, quantity: quantity, customer: customer})

    if (food && quantity > 0) {
      const itemPrice = food.price;
      const newItem = {
        name: food.label,
        customer: 'guest',
        quantity,
        price: itemPrice,
        delivery: delivery,
      };
      setCartItems((prevItems) => [...prevItems, newItem]);
      setFood(null);
      setQuantity("");
      setDelivery(false);
    }
  };

  return (
    <div className="order-section">
      <h2 className="order-title">Order Here</h2>
      <form onSubmit={handleAddToCart}>
        <label className="hide-element">Food selector</label>
        <Select
          options={options}
          styles={customStyles}
          getOptionLabel={(option) =>
            option.label.charAt(0).toUpperCase() + option.label.slice(1)
          }
          placeholder="Select your food"
          value={food}
          onChange={handleFoodChange}
        />
        <label className="hide-element">Food quantity</label>
        <input
          className="quantity-input"
          type="number"
          name="quantity"
          id="quantity"
          placeholder="How many?"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button type="submit">Add to cart</button>
      </form>
    </div>
  );
}
