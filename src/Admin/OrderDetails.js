import React from 'react';
import './OrderDetails.css';
import sampleImg from '../assets/shake.png'; // Use your image

const items = [
  {
    name: 'Kesar Pista Coconut Shake',
    price: 150,
    preference: 'Without ice (+10rs)',
    image: sampleImg,
    quantity: 1,
    checked: true,
  },
  {
    name: 'Kesar Pista Coconut Shake',
    price: 150,
    preference: 'Without ice (+10rs)',
    image: sampleImg,
    quantity: 1,
    checked: false,
  },
  {
    name: 'Kesar Pista Coconut Shake',
    price: 150,
    preference: 'Without ice (+10rs)',
    image: sampleImg,
    quantity: 1,
    checked: false,
  },
];

const OrderDetails = () => {
  return (
    <div className="order-details-wrapper">
      <div className="order-header">
        <div>
          <p className="order-id">Order_01</p>
          <p className="customer-name">Prakash Kumar</p>
        </div>
        <div className="order-meta">
          <p className="amount">₹ 700.00</p>
          <p className="paid-status">✔ PAID</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="order-items">
        {items.map((item, index) => (
          <div key={index} className={`order-item ${item.checked ? 'checked' : ''}`}>
            <div className="checkbox">
              <input type="checkbox" defaultChecked={item.checked} />
            </div>
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">₹{item.price}</p>
              <p className="preference">
                <span>Preference</span>
                <span className="pref-value">{item.preference}</span>
              </p>
            </div>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <span className="quantity">{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="served-button">Served</button>
    </div>
  );
};

export default OrderDetails;
