import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/products/'
const CreateProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {product_name: name, product_description: description, price: price, stock: stock})
        navigate('/products')
    }

return (
    <div>
        <h3>Create Product</h3>
        <form onSubmit={store}>
            <div>
                <label>Product Name</label>
                <input
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                    type='text'
                    className='form-control'
                />
                <label>Description</label>
                <input
                    value={description}
                    onChange={ (e) => setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                />
                <label>Price</label>
                <input
                    value={price}
                    onChange={ (e) => setPrice(e.target.value)}
                    type='number'
                    className='form-control'
                />
                <label>Stock</label>
                <input
                    value={stock}
                    onChange={ (e) => setStock(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>
            <button type='submit'>Store</button>
        </form>
    </div>
)
}

export default CreateProduct
