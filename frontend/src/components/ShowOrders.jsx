import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import axiosAPI from '../api/axiosAPI';

const endpoint = '/api/orders';

const options = [
    {value: "", label: "No filter"},
    {value: "Queued", label: "Queued"},
    {value: "Ready", label: "Ready"},
    {value: "Delivered", label: "Delivered"},
    {value: "Canceled", label: "Canceled"}];

const ShowOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [timestamp, setTimestamp] = useState('');

    useEffect( ()=> {
        getAllOrders()
    }, [])

    useEffect(() => {
        if(!filter || !filter.value) {
            setFilteredOrders(orders);
        } else {
            const filteredOrders = orders.filter((order) => order.order_status === filter.value);
            setFilteredOrders(filteredOrders);
        }
    }, [orders, filter])

    const handleStatusFilter = (selectedOption) => {
        setFilter(selectedOption);
    }

    const getAllOrders = async () => {
        const response = await axiosAPI.get(`${endpoint}`)
        setOrders(response.data)
        console.log(response.data)
    }

  return (
    <div>
        <div className='d-grip gap-2'>
            <Link to="/guest" className='btn btn-success btn-lg mt-2 mb-2 text white'>Create</Link>
            <Select
                options={options}
                placeholder="Status of Order"
                value={filter}
                onChange={handleStatusFilter}
            />
        </div>

        <table className='table table-stripped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Delivery Address</th>
                    <th>Order Detail</th>
                    <th>Comments</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Order Date</th>
                </tr>
            </thead>
            <tbody>
                { filteredOrders.map ( (order => (
                    <tr key={order.order_id}>
                        <td> {order.customer} </td>
                        <td> {order.phone} </td>
                        <td> {order.delivery_address} </td>
                        <td>
                            {order.order_items.map((orderItem => (
                                <div key={`${order.order_id}-${orderItem.product_id}`}>
                                    {orderItem.product.product_name} x {orderItem.quantity}
                                </div>
                            )))}
                        </td>
                        <td> {order.comments} </td>
                        <td> C$ {order.order_total} </td>
                        <td> {order.order_status} </td>
                        <td>{dayjs(order.updated_at).format('DD/MM/YYYY HH:mm:ss')}</td>
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

export default ShowOrders
