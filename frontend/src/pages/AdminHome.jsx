import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import CreateProduct from "../components/CreateProduct";
import Modal from "../components/Modal";
import ShowOrders from "../components/ShowOrders";
import ShowProducts from "../components/ShowProducts";
import ShowUsers from "../components/ShowUsers";
import Sidebar from "../components/Sidebar";
import CreateUser from "../components/CreateUser";
import EditProduct from "../components/EditProduct";
import EditUser from "../components/EditUser";
import EditOrder from "../components/EditOrder";

import "../styles/AdminHome.css";

function AdminHome() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState(0);

  const handleIsOpen = (newState, newContentType) => {
    setIsOpen(newState);
    setContentType(newContentType);
  };

  const contentComponents = {
    "/admin-home/products": [<CreateProduct />, <EditProduct/>],
    "/admin-home/users": [<CreateUser />, <EditUser/>],
    "/admin-home/orders": ["", <EditOrder/>],
  };

  let modalContent;
  const currentPath = location.pathname;
  const components = contentComponents[currentPath]

  if (contentType === 1) modalContent = components[0];
  else if (contentType === 2) modalContent = components[1];
   
  return (
    <div className="admin-home">
      <Sidebar />
      <main className="admin-content">
        {location.pathname === "/admin-home/products" && (
          <ShowProducts isOpen={isOpen} handleIsOpen={handleIsOpen} />
        )}
        {location.pathname === "/admin-home/users" && (
          <ShowUsers isOpen={isOpen} handleIsOpen={handleIsOpen} />
        )}
        {location.pathname === "/admin-home/orders" && (
          <ShowOrders isOpen={isOpen} handleIsOpen={handleIsOpen} />
        )}
      </main>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          modalContent={modalContent}
        />
      )}
    </div>
  );
}

export default AdminHome;
