import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/orders';

const ShowMyOrders = () => {
    const navigate = useNavigate()
    const [ orders, setOrders ] = useState( [] )
    useEffect( ()=> {
        getAllOrders()
    }, [])



    const getAllOrders = async () => {
        const response = await axios.get(`${endpoint}`)
        setOrders(response.data)
        console.log(response.data)
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
                { orders.map ( (order => (
                    <tr key={order.order_id}>
                        <td> {order.customer} </td>
                        <td> {order.phone} </td>
                        <td> {order.delivery_address} </td>
                        <td> {order.comments} </td>
                        <td> {order.order_total} </td>
                        <td> {order.order_status} </td>
                        <td>
                            <Link to={`/editOrder/${order.order_id}`} ><button className='btn btn-warning'>Edit</button></Link>
                        </td>
                    </tr>
                )))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowMyOrders
