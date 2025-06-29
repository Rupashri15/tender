import React from 'react';
import './Dashboard.css'; // Uses same styling

const OrderCard = ({ order }) => {
  if (!order) return null; // Prevent error if undefined

  const isActive = order.status === 'active';

  return (
    <div className="order-card">
      <div className="order-info">
        <div className={`status-dot ${isActive ? 'active' : 'past'}`}></div>
        <div>
          <p className="order-details">
            {order.name?.length > 35 ? order.name.slice(0, 35) + "..." : order.name}
          </p>
          <div className="view-link">View Order details</div>
        </div>
      </div>
      <p className="order-price">₹ {order.price?.toFixed(2)}</p>
    </div>
  );
};

export default OrderCard;
