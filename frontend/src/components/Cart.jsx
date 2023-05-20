import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endPoint = 'http://localhost:8000/api/myCart/'

const Cart = () => {

    const navigate = useNavigate()
    const [comments, setComments] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [delivery, setDelivery] = useState(false);
    const [cartItems, setCartItems] = useState( [] )
    useEffect( ()=> {
        getAllCartItems()
    }, [])

    const handleDeliveryChange = (e) => {
        setDelivery(e.target.checked);
      };

    const getAllCartItems = async () => {
        const response = await axios.get(`${endPoint}`)
        setCartItems(response.data)
    }

    const deleteCartItem = async (id) => {
        await axios.delete(`${endPoint}${id}`)
        navigate('/cart')
    }

    const handleCheckoutClick = async () => {
        await axios.post(endpoint, {phone: phone, delivery_address: deliveryAddress, comments: comments})
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
                        <td> {cartItem.quantity} </td>
                        <td>
                            <button onClick={ ()=>deleteCartItem(cartItem.product_id) } className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )))}
            </tbody>
            <tfoot className='bg-primary text-white'>
                <tr>
                    <th>Total:</th>
                    <th>$C{ }</th>
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
        <div>
          <input
            className="form-input"
            name="deliveryAddress"
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Where is the delivery address?"
          />
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
