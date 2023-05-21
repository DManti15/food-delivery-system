import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";

import "../styles/Modal.css";

const Modal = ({ setIsOpen, cartItems, setCartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price of the items
  const calculateTotalPrice = () => {
    const prices = cartItems.map((item) => item.price * item.quantity);
    const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
    setTotalPrice(totalPrice);
  };

  // Render the table rows for each item
  const renderItems = () => {
    return cartItems.map((item, index) => (
      <tr key={index}>
        <td>
          {item.name}
          <td className="table-num left">C${item.price * item.quantity}</td>
        </td>
        <td className="table-num">x{item.quantity}</td>
      </tr>
    ));
  };

  // Handle the "Add Item" button click
  const handleAddItemClick = () => {
    setIsOpen(false);
  };

  // Handle the "Checkout" button click
  const handleCheckoutClick = () => {
    // TODO: Implement the checkout logic
  };

  const delivery = cartItems.some((item) => item.delivery);

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <>
      <div className="dark-bg" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modal-header">
            <h5 className="heading blue-text">My Cart</h5>
          </div>
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th className="red-text">Name</th>
                  <th className="red-text right">Amount</th>
                </tr>
              </thead>
              <tbody>{renderItems()}</tbody>
            </table>
          </div>
          <div className="modal-bottom">
            { delivery && (<div className="delivery-price"><span>Delivery</span> C$5</div>)}
            <div className="total-price">
              <span>Total:</span> C${totalPrice  + (delivery ? 5 : 0)} 
            </div>
            <div className="buttons">
              <button className="add-item button" onClick={handleAddItemClick}>
                Add Item
              </button>
              <button className="checkout button" onClick={handleCheckoutClick}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
