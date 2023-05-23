import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/myCart/'

const Cart = () => {

    const navigate = useNavigate()
    const [comments, setComments] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [delivery, setDelivery] = useState(false);
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleQuantityChange = (cartItemId, e) => {
      const updatedItems = cartItems.map((item) => {
        if (item.product_id === cartItemId) {
          return { ...item, quantity: parseInt(e.target.value) };
        }
        return item;
      });
    
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      console.log(updatedItems);
    };

    const calculateTotalPrice = (items) => {
      const prices = items.map((item) => {
        const itemPrice = item.price * item.quantity;
        return itemPrice;
      });
    
      const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
      setTotalPrice(totalPrice);
    };

    useEffect(() => {
      getAllCartItems();
    }, []);
    

    const handleDeliveryChange = (e) => {
        setDelivery(e.target.checked);
        setVisible(visible => !visible);
        if(!visible) {
          setDeliveryAddress('')
        } else {
          setDeliveryAddress('Pick up order');
        }
      };

    const getAllCartItems = async () => {
        const response = await axios.get(`${endpoint}`);
        const items = response.data;
        console.log(response.data);
        setCartItems(items);
        calculateTotalPrice(items);
    }

    const deleteCartItem = async (id) => {
        await axios.delete(`${endpoint}${id}`)
        getAllCartItems();
    }

    const handleCheckoutClick = async () => {
      console.log(totalPrice);
        await axios.post(endpoint, {cart_items: cartItems, phone: phone, delivery_address: deliveryAddress, comments: comments, order_total: totalPrice + (delivery ? 5 : 0)})
        navigate('/guest');
      };

  return (
    <div>
        <table className='table table-stripped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                { cartItems.map ( (cartItem => (
                    <tr key={cartItem.product_id}>
                        <td> {cartItem.product_name} C${cartItem.price * cartItem.quantity}</td>
                        <td>
                        <input
                          className="quantity-input"
                          type="number"
                          value={cartItem.quantity}
                          onChange={(e) => handleQuantityChange(cartItem.product_id, e)}
                        />
                        </td>
                        <td>
                            <button onClick={ ()=>deleteCartItem(cartItem.product_id) } className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )))}
            </tbody>
            <tfoot className='bg-primary text-white'>
                <tr>
                    <th>Total:</th>
                    <th>$C{totalPrice + (delivery ? 5 : 0)}</th>
                </tr>
            </tfoot>
        </table>
        <div className="delivery-checkbox">
          <label htmlFor="delivery">Add Delivery</label>
          <input
            type="checkbox"
            name="delivery"
            id="delivery"
            checked={delivery}
            onChange={handleDeliveryChange}
          />
        </div>
        <div> { visible ?
          <input
            className="form-input"
            name="deliveryAddress"
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Where is the delivery address?"
          /> : null}
        </div>
        <div>
          <input
            className="form-input"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="comments"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Any extra comment or suggestion"
          />
        </div>
        <button className="checkout button" onClick={handleCheckoutClick}>
                Checkout
        </button>
    </div>
  )
}

export default Cart
