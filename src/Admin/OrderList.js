import React from 'react';
import './OrderList.css';
import { FaCheckCircle } from 'react-icons/fa';
import { BiFilter } from 'react-icons/bi';

const orders = [
  { id: 'Order_01', name: 'Prakash Kumar', price: 700, items: 'Kesar Pista Coconut Shake & Pineapple...', status: 'PAID' },
  { id: 'Order_02', name: 'Dinesh Raj', price: 700, items: 'Kesar Pista Coconut Shake & Pineapple...', status: 'PAID' },
  { id: 'Order_03', name: 'Shankar', price: 700, items: 'Kesar Pista Coconut Shake & Pineapple...', status: 'CASH' },
  { id: 'Order_04', name: 'Krishna', price: 700, items: 'Kesar Pista Coconut Shake & Pineapple...', status: 'PAID' },
  { id: 'Order_05', name: 'Prem Kumar', price: 700, items: 'Kesar Pista Coconut Shake & Pineapple...', status: 'PAID' },
];

const OrderList = () => {
  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Welcome, Pradhap!</h2>
        <BiFilter className="filter-icon" />
      </div>

      <input type="text" className="search-box" placeholder="Search" />

      <div className="order-list">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`order-card ${order.status === 'CASH' ? 'cash' : 'paid'}`}
          >
            <div className="order-id">{order.id}</div>
            <div className="order-details">
              <strong>{order.name}</strong>
              <p>{order.items}</p>
            </div>
            <div className="order-price-status">
              <div className="price">${order.price.toFixed(2)}</div>
              <div className="status">
                <FaCheckCircle />
                <span>{order.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <div className="nav-item active">Orders</div>
        <div className="nav-item">Menu</div>
        <div className="nav-item">Category</div>
        <div className="nav-item">Profile</div>
      </div>
    </div>
  );
};

export default OrderList;
