import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axiosAPI from "../api/axiosAPI";

const endPoint = "/api/products/";

const ShowProducts = ({ isOpen, handleIsOpen }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleStateChange = (e) => {
    isOpen = true;
    let newState = isOpen;
    const btnClass = e.target.classList;
    const options = btnClass.contains("options-btn");
    const edit = btnClass.contains("edit-btn");
    if (options) handleIsOpen(newState, 1);
    else if (edit) handleIsOpen(newState, 2);
  };

  const getAllProducts = async () => {
    const response = await axiosAPI.get(`${endPoint}`);
    setProducts((prevProducts) => {
      if (JSON.stringify(prevProducts) !== JSON.stringify(response.data)) {
        return response.data;
      }
      return prevProducts;
    });
    console.log(products);
  };

  const deleteAllProducts = async (id) => {
    await axiosAPI.delete(`${endPoint}${id}`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    navigate("/admin-home/products");
  };

  useEffect(() => {
    getAllProducts();
  }, [products]);

  return (
    <div className="wrapper">
      <h2 className="table-title">Products</h2>
      <div className="table-container">
        <div className="table-options">
          <button className="flex-btn options-btn" onClick={handleStateChange}>
            Add Product <Plus size="1.5rem" />
          </button>
        </div>
        <div className="scrollbar-container">
          <table className="table-dashboard table-stripped">
            <thead className="bg-primary text-white">
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td> {product.product_name} </td>
                  <td> {product.product_description} </td>
                  <td> {product.price} </td>
                  <td> {product.stock} </td>
                  <td className="flex-cell">
                    <button
                      className="flex-btn edit-btn"
                      onClick={handleStateChange}
                    >
                      Edit <PencilSimple size="1.5rem" />
                    </button>
                    <button
                      onClick={() => deleteAllProducts(product.product_id)}
                      className="flex-btn delete-btn"
                    >
                      Delete
                      <Trash size="1.5rem" />
                    </button>
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

export default ShowProducts;
