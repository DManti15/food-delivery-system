import React, { useState } from 'react';
import './AdminLogin.css'
import LoginForm from './LoginForm';
import mtLogo from './assets/images/logos/mtLogo.svg'

function AdminLogin() {
  return ( 
    <div className="admin-container">
      <img src={mtLogo} className="mtLogo" alt="Mission Trip ministry logo" />
      <h1>Admin Panel</h1>
      <LoginForm/>
    </div>
   );
}

export default AdminLogin;