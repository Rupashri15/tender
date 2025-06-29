import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './User/Home';
import Login from './User/Login';
import OtpVerification from './User/OtpVerification';
import Menu from './User/Menu';
import Cart from './User/Cart';
import CustomCart from './User/CustomCart';
import Dashboard from './User/Dashboard';
import OrderCard from './User/OrderCard';
import Receipt from './User/Receipt';
import Feedback from './User/Feedback';

// import Home from './Home';
// import Login from './Login';
// import OtpVerification from './OtpVerification'; 
// import Menu from './Menu';
// import Receipt from './Receipt';

// Admin pages
import AdminHome from './Admin/AdminHome'
import AdminLogin from './Admin/AdminLogin';
import OrderList from './Admin/OrderList';
import OrderDetails from './Admin/OrderDetails';
import MenuManagement from './Admin/MenuManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpVerification />} /> 
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customcart" element={<CustomCart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderCard />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/feedback" element={<Feedback />} />

         {/* Admin Routes */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/order-details" element={<OrderDetails />} />
        <Route path="/admin/menu-manage" element={<MenuManagement />} />
        {/* You can add more like: <Route path="/admin/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

