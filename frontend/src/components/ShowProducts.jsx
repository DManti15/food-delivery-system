import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

import axiosAPI from '../api/axiosAPI';

const endPoint = '/api/products'

const ShowProducts = () => {
    const navigate = useNavigate()
    const [ products, setProducts ] = useState( [] )
    useEffect( ()=> {
        getAllProducts()
    }, [])



    const getAllProducts = async () => {
        const response = await axiosAPI.get(`${endPoint}`)
        setProducts(response.data)
        console.log(response.data)
    }

    const deleteAllProducts = async (id) => {
        await axiosAPI.delete(`${endPoint}/products/${id}`)
        navigate('/products')
    }

  return (
    <div>
        <div className='d-grip gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text white'>Create</Link>
        </div>

        <table className='table table-stripped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                { products.map ( (product => (
                    <tr key={product.product_id}>
                        <td> {product.product_name} </td>
                        <td> {product.product_description} </td>
                        <td> {product.price} </td>
                        <td> {product.stock} </td>
                        <td>
                            <Link to={`/edit/${product.product_id}`} ><button className='btn btn-warning'>Edit</button></Link>
                            <button onClick={ ()=>deleteAllProducts(product.product_id) } className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowProducts
