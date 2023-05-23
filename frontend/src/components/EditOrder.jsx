import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";

const endpoint = 'http://localhost:8000/api/orders/'

const options = [
    { value: 1, label: "Queued"},
    { value: 2, label: "Ready"},
    { value: 3, label: "Delivered"},
    { value: 4, label: "Canceled"},
];

const EditOrder = () => {
    const [orderId, setOrderId] = useState(0)
    const [customer, setCustomer] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [cancelReason, setCancelReason] = useState('')
    const [visible, setVisible] = useState(false)
    const [comments, setComments] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        setComments(comments => `${comments}###${cancelReason}`)
        console.log(cancelReason)
        console.log(comments)
        await axios.put(`${endpoint}${id}`, {order_status: orderStatus, comments: comments})
        navigate('/orders')
    }


    const handleStatusChange = (selectedOption) => {
        setOrderStatus(selectedOption['label']);
        if (selectedOption['label'] = 'Canceled') {
            setVisible(visible => !visible);
        }
      }

    useEffect( () => {
        const getOrderById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setOrderId(response.data.orderId)
            setCustomer(response.data.customer)
            setOrderStatus(response.data.orderStatus)
            setComments(response.data.comments)
        }
        getOrderById()
    }, [])

  return (
    <div>
        <h3>Edit Order</h3>
        <form onSubmit={update}>
            <div>
                <label>{orderId}</label>
                <label>{customer}</label>
                <Select
                    options={options}
                    getOptionLabel={(option) =>
                        option.label.charAt(0).toUpperCase() + option.label.slice(1)
                    }
                    placeholder="Order Status"
                    value={options.value}
                    onChange={handleStatusChange}
                />
                <div> {visible ? 
                    <input
                        className="form-input"
                        name="cancelReason"
                        type="text"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Why do you want to cancel?"
                    /> : null}
                </div>
            </div>
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default EditOrder
