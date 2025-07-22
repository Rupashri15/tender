import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  if (!order) return null;

  const isActive = order.status === 'active';
  const iconName = isActive ? 'schedule' : 'check_circle';
  const iconColor = isActive ? '#2F03B3' : '#3E7701';

  return (
    <div className="order-card">
      <div className="order-card-inner">
        <div className="order-left">
          <span
            className="material-symbols-rounded status-icon"
            style={{
              color: iconColor,
              fontVariationSettings: "'FILL' 1, 'wght' 400"
            }}
          >
            {iconName}
          </span>
          <div className="order-texts">
            <p className="order-id">Order#{order.id}</p>
            <p className="order-details">
              {order.name?.length > 50 ? order.name.slice(0, 50) + '...' : order.name}
            </p>
            <div className="view-link" onClick={() => navigate('/receipt')}>
              View Order details
            </div>
          </div>
        </div>

        <div className="order-right">
          <p className="order-price">₹ {order.price?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;




// import React from 'react';
// import './Dashboard.css';

// const OrderCard = ({ order }) => {
//   if (!order) return null;

//   const isActive = order.status === 'active';
//   const iconName = isActive ? 'schedule' : 'check_circle';
//   const iconColor = isActive ? '#2F03B3' : '#3E7701';

//   return (
//     <div className="order-card">
//       <div className="order-card-inner">
//         <div className="order-left">
//           <span
//             className="material-symbols-rounded status-icon"
//             style={{
//               color: iconColor,
//               fontVariationSettings: "'FILL' 1, 'wght' 400"
//             }}
//           >
//             {iconName}
//           </span>
//           <div className="order-texts">
//             <p className="order-id">Order#{order.id}</p>
//             <p className="order-details">
//               {order.name?.length > 50 ? order.name.slice(0, 50) + '...' : order.name}
//             </p>
//             <div className="view-link">View Order details</div>
//           </div>
//         </div>

//         <div className="order-right">
//           <p className="order-price">₹ {order.price?.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default OrderCard;

// import React from 'react';
// import './Dashboard.css';

// const OrderCard = ({ order }) => {
//   if (!order) return null;

//   const isActive = order.status === 'active';
//   const iconName = isActive ? 'schedule' : 'check_circle';
//   const iconColor = isActive ? '#2F03B3' : '#3E7701';

//   return (
//     <div className="order-card">
//       <div className="order-info">
//         <span
//           className="material-symbols-rounded status-icon"
//           style={{
//             color: iconColor,
//             fontVariationSettings: "'FILL' 1, 'wght' 400"
//           }}
//         >
//           {iconName}
//         </span>

//         <div>
//           <p className="order-details">
//             {order.name?.length > 35 ? order.name.slice(0, 35) + '...' : order.name}
//           </p>
//           <div className="view-link">View Order details</div>
//         </div>
//       </div>
//       <p className="order-price">₹ {order.price?.toFixed(2)}</p>
//     </div>
//   );
// };

// export default OrderCard;

