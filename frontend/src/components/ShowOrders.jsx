import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { tableStyle } from "../assets/selectorStyles";

import axiosAPI from "../api/axiosAPI";
import { Plus, PencilSimple } from "@phosphor-icons/react";

const endpoint = "/api/orders";

const options = [
  { value: "", label: "No filter" },
  { value: "Queued", label: "Queued" },
  { value: "Ready", label: "Ready" },
  { value: "Delivered", label: "Delivered" },
  { value: "Canceled", label: "Canceled" },
];

const ShowOrders = ({ isOpen, handleIsOpen }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [timestamp, setTimestamp] = useState("");

  const handleStateChange = (e) => {
    isOpen = true;
    let newState = isOpen;
    const btnClass = e.target.classList;
    const options = btnClass.contains("options-btn");
    const edit = btnClass.contains("edit-btn");
    if (options) handleIsOpen(newState, 1);
    else if (edit) handleIsOpen(newState, 2);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (!filter || !filter.value) {
      setFilteredOrders(orders);
    } else {
      const filteredOrders = orders.filter(
        (order) => order.order_status === filter.value
      );
      setFilteredOrders(filteredOrders);
    }
  }, [orders, filter]);

  const handleStatusFilter = (selectedOption) => {
    setFilter(selectedOption);
  };

  const getAllOrders = async () => {
    const response = await axiosAPI.get(`${endpoint}`);
    setOrders(response.data);
  };

  return (
    <div className="wrapper">
      <h2 className="table-title">Orders</h2>
      <div className="table-container">
        <div className="table-options">
          <button className="flex-btn options-btn">
            Add Order <Plus size="1.5rem" />
          </button>
          <Select
            options={options}
            styles={tableStyle}
            placeholder="Filter by Status"
            value={filter}
            onChange={handleStatusFilter}
          />
        </div>
        <div className="scrollbar-container">
          <table className="table-dashboard table-stripped">
            <thead className="bg-primary text-white">
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Delivery Address</th>
                <th>Order Detail</th>
                <th>Comments</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td> {order.customer} </td>
                  <td> {order.phone} </td>
                  <td> {order.delivery_address} </td>
                  <td>
                    {order.order_items.map((orderItem) => (
                      <div key={`${order.order_id}-${orderItem.product_id}`}>
                        {orderItem.product.product_name} x {orderItem.quantity}
                      </div>
                    ))}
                  </td>
                  <td> {order.comments} </td>
                  <td> C$ {order.order_total} </td>
                  <td> {order.order_status} </td>
                  <td>
                    {dayjs(order.updated_at).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td className="flex-cell">
                    {order.order_status !== "Canceled" &&
                      order.order_status !== "Delivered" && (
                        <button
                          className="flex-btn edit-btn"
                          onClick={handleStateChange}
                        >
                          Edit <PencilSimple size="1.5rem" />
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowOrders;
