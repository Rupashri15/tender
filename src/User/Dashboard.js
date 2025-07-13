import React from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import gift from '../assets/gift.png';
import phone from '../assets/phone.png';
import OrderCard from './OrderCard'; 
import './Dashboard.css';

const Dashboard = () => {
  const activeOrder = {
    name: "Kesar Pista Coconut Shake & Pineapple",
    price: 700,
    status: "active"
  };

  const pastOrders = [
    {
      name: "Kesar Pista Coconut Shake & Pineapple",
      price: 700,
      status: "past"
    },
    {
      name: "Mango Delight",
      price: 550,
      status: "past"
    },
    {
      name: "Oreo Chocolate Frappe",
      price: 650,
      status: "past"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Greeting and Edit */}
      <div className="dashboard-header">
        <p>Good Evening, Pradhap!</p>
        <span className="material-symbols-rounded" style={{ color: '#626262', cursor: 'pointer' }}>
  edit
</span>

        {/* <FaEdit style={{ color: '#666', cursor: 'pointer' }} /> */}
      </div>

      {/* Earned Points Card */}
      <div className="points-card">
        <div>
          <p>Earned Points</p>
          <h2>$500.09</h2>
          <p>Tender Town Discount Cash</p>
        </div>
        <img src={gift} alt="Gift" className="points-image" />
      </div>

      {/* Explore Menu Button */}
<div className="menu-button">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
  src={phone}
  alt="Phone"
  style={{
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    display: 'block',
    marginRight: '12px'
  }}
/>

    {/* <p className="menu-text">Explore Our Menu</p>
  </div>
  <FaSearch /> */}

  <p className="menu-text">Explore Our Menu</p>
</div>
<span className="material-symbols-rounded" style={{ color: '#1C1B1F' }}>
  bubble
</span>

</div>




      {/* Active Orders */}
      <div style={{ marginBottom: '24px' }}>
        <h3 className="section-title">Active Orders Summary</h3>
        <OrderCard order={activeOrder} />
      </div>

      {/* Past Orders */}
      <div>
        <h3 className="section-title">Past Orders Summary</h3>
        {pastOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
