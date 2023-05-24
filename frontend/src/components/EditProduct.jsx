import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axiosAPI from '../api/axiosAPI';

const endpoint = '/api/products/'
const EditProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axiosAPI.put(`${endpoint}${id}`, {product_name: name, product_description: description, price: price, stock: stock})
        navigate('/products')
    }

    useEffect( () => {
        const getProductById = async () => {
            const response = await axiosAPI.get(`${endpoint}${id}`)
            setName(response.data.product_name)
            setDescription(response.data.product_description)
            setPrice(response.data.price)
            setStock(response.data.stock)
        }
        getProductById()
    }, [])

  return (
    <div>
        <h3>Edit Product</h3>
        <form onSubmit={update}>
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
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default EditProduct
