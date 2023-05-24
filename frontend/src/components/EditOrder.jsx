import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";

import axiosAPI from '../api/axiosAPI';

const endpoint = '/api/orders/'

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
    const [updatedComments, setUpdatedComments] = useState('')
    const [filteredOptions, setFilteredOptions] = useState([]);
    const options = [
        { value: 1, label: "Queued" },
        { value: 2, label: "Ready" },
        { value: 3, label: "Delivered" },
        { value: 4, label: "Canceled" },
      ];
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const updatedComments = comments ? cancelReason + '\n' + comments : cancelReason;
        await axios.put(`${endpoint}${id}`, {order_status: orderStatus, comments: updatedComments})
        navigate('/orders')
    }


    const handleStatusChange = (selectedOption) => {
        setOrderStatus(selectedOption['label']);
        if (selectedOption['label'] === 'Canceled') {
            setVisible(true);
        } else {
            setVisible(false);
        }
      }

      useEffect(() => {
        const getOrderById = async () => {
          const response = await axios.get(`${endpoint}${id}`);
          setOrderId(response.data.orderId);
          setCustomer(response.data.customer);
          setOrderStatus(response.data.order_status);
          setComments(response.data.comments);
        };
      
        getOrderById();
      }, []);
      
      useEffect(() => {
        let currentOptions = [];
      
        if (orderStatus === 'Queued') {
          currentOptions = options.filter((option) => ['Ready', 'Delivered', 'Canceled'].includes(option.label));
        } else if (orderStatus === 'Ready') {
          currentOptions = options.filter((option) => option.label === 'Delivered');
        }      

        setFilteredOptions(currentOptions);

      }, [orderStatus]);

  return (
    <div>
        <h3>Edit Order</h3>
        <form onSubmit={update}>
            <div>
                <label>{orderId}</label>
                <label>{customer}</label>
                <label>{orderStatus}</label>
                <Select
                    options={filteredOptions}
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
