import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/AuthLayout";
import GuestLayout from "./components/GuestLayout";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Guest from "./pages/Guest";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ShowUsers from "./components/ShowUsers";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import Cart from "./components/Cart";
{/*
import ShowOrders from "./components/ShowOrders";
import ShowMyOrders from "./components/ShowMyOrders";
*/}


import "./App.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="guest" element={<Guest />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="cart" element={<Cart />} />
          {/*
          <Route path="orders" element={<ShowOrders />} />
          <Route path="myOrders" element={<ShowMyOrders />} />
          */}
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="products" element={<Products />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="users" element={<ShowUsers />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="editUser/:id" element={<EditUser />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
