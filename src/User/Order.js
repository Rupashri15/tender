// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Order.css';
// import loadingGif from '../assets/ani.gif';

// export default function Order() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialItems = location.state?.cartItems || [];
//   const [cartItems, setCartItems] = useState(initialItems);
//   const [unavailableItems, setUnavailableItems] = useState([]);
//   const [checkingAvailability, setCheckingAvailability] = useState(false);
//   const [showUnavailable, setShowUnavailable] = useState(false);

//   const handleQtyChange = (index, delta) => {
//     const updatedItems = [...cartItems];
//     updatedItems[index].qty = Math.max(1, updatedItems[index].qty + delta);
//     updatedItems[index].price = updatedItems[index].qty * updatedItems[index].oldPrice;
//     setCartItems(updatedItems);
//   };

//   const handleProceed = () => {
//     setCheckingAvailability(true);
//     setShowUnavailable(false);

//     setTimeout(() => {
//       const unavailable = cartItems.filter((item) => item.name === 'Oreo Milkshake');
//       setUnavailableItems(unavailable);

//       setTimeout(() => {
//         setShowUnavailable(true);
//         setCheckingAvailability(false);
//       }, 20000);
//     }, 1500);
//   };

//   const removeUnavailable = () => {
//     const remaining = cartItems.filter(
//       (item) => !unavailableItems.find((un) => un.name === item.name)
//     );
//     setCartItems(remaining);
//     setUnavailableItems([]);
//     setShowUnavailable(false);
//   };

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
//   const gst = Math.round(subtotal * 0.05);
//   const total = subtotal + gst;


//   const removeUnavailableItem = (name) => {
//   const remaining = cartItems.filter(item => item.name !== name);
//   const stillUnavailable = unavailableItems.filter(item => item.name !== name);
//   setCartItems(remaining);
//   setUnavailableItems(stillUnavailable);

//   // If all unavailable items are removed, hide the warning box
//   if (stillUnavailable.length === 0) {
//     setShowUnavailable(false);
//   }
// };


//   return (
//     <div className="order-page">
//       <div className="order-content">
//         <div className="reward-banner">
//           🥳 You earned ₹{Math.floor(total / 16)} Points on this order
//         </div>

//         <div className="order-item-list">
//           {cartItems.map((item, index) => {
//             const isUnavailable = showUnavailable && unavailableItems.find(un => un.name === item.name);
//             return (
//               <div className={`order-card ${isUnavailable ? 'unavailable' : ''}`} key={index}>
//                 <div className="left">
//                   <div className="veg-icon" />
//                   <div className="details">
//                     <h4>{item.name}</h4>
//                     <p>{item.customizeNote || 'No customization'}</p>
//                     <button className="edit-btn" disabled={isUnavailable}>
//                       Edit <span className="material-symbols-rounded arrow-icon">arrow_right</span>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="right">
//                   <div className="qty-control">
//                     <button onClick={() => handleQtyChange(index, -1)} disabled={isUnavailable}>-</button>
//                     <span>{item.qty}</span>
//                     <button onClick={() => handleQtyChange(index, 1)} disabled={isUnavailable}>+</button>
//                   </div>
//                   <div className="price">
//                     <span className="strike">₹{item.oldPrice * item.qty}</span>
//                     <strong>₹{item.price}</strong>
//                   </div>
//                 </div>

//                 {/* Exclamation & Delete Icons */}
//                 {isUnavailable && (
//   <div className="delete-badge">
//     <span className="material-symbols-rounded">delete</span>
//   </div>
// )}


//                 {/* {isUnavailable && (
//                   <div className="unavailable-icons">
                    
//                     <span className="material-symbols-rounded delete-icon">delete</span>
//                   </div>
//                 )} */}
//               </div>
//             );
//           })}
//         </div>

//         <div className="price-summary">
//           <div><span>Subtotal</span><span>₹{subtotal}</span></div>
//           <div><span>GST (5%)</span><span>₹{gst}</span></div>
//           <div className="total-line"><span>Total</span><span>₹{total}</span></div>
//         </div>

//         {isUnavailable && (
//   <div className="delete-badge" onClick={() => removeUnavailableItem(item.name)}>
//     <span className="material-symbols-rounded">delete</span>
//   </div>
// )}

        
//           {/* {showUnavailable && unavailableItems.length > 0 && (
//   <div className="unavailable-warning">
//     <div className="unavailable-title">
//       <span className="material-symbols-rounded unavailable-icon">report</span>
//       {unavailableItems.length} Item Unavailable
//     </div>
//     <p>Sorry! Few items are now out of stock.</p>
//     <button className="remove-btn" onClick={removeUnavailable}>Remove Unavailable Items</button>
//   </div>

//         )} */}
//       </div>

//       <div className="order-actions">
//         <button className="proceed-btn" onClick={handleProceed}>Proceed to Order</button>
//         <button className="back-btn" onClick={() => navigate('/menu')}>Back to Menu</button>
//       </div>

//       {checkingAvailability && (
//         <div className="checking-modal-overlay">
//           <div className="checking-modal">
//             <p className="checking-text">Please wait Availability Checking</p>
//             <img src={loadingGif} alt="Loading..." className="checking-gif" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Order.css';
import loadingGif from '../assets/ani.gif';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItems = location.state?.cartItems || [];
  const [cartItems, setCartItems] = useState(initialItems);
  const [unavailableItems, setUnavailableItems] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);

  const handleQtyChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty = Math.max(1, updatedItems[index].qty + delta);
    updatedItems[index].price = updatedItems[index].qty * updatedItems[index].oldPrice;
    setCartItems(updatedItems);
  };

  const handleProceed = () => {
    setCheckingAvailability(true);
    setShowUnavailable(false);

    setTimeout(() => {
      const unavailable = cartItems.filter((item) => item.name === 'Oreo Milkshake');
      setUnavailableItems(unavailable);

      setTimeout(() => {
        setShowUnavailable(true);
        setCheckingAvailability(false);
      }, 2000);
    }, 1500);
  };

  const removeUnavailable = () => {
    const remaining = cartItems.filter(
      (item) => !unavailableItems.find((un) => un.name === item.name)
    );
    setCartItems(remaining);
    setUnavailableItems([]);
    setShowUnavailable(false);
  };

  const removeUnavailableItem = (name) => {
    const remaining = cartItems.filter(item => item.name !== name);
    const stillUnavailable = unavailableItems.filter(item => item.name !== name);
    setCartItems(remaining);
    setUnavailableItems(stillUnavailable);
    if (stillUnavailable.length === 0) {
      setShowUnavailable(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <div className="order-page">
      <div className="order-content">
        <div className="reward-banner">
          🥳 You earned ₹{Math.floor(total / 16)} Points on this order
        </div>

        <div className="order-item-list">
          {cartItems.map((item, index) => {
            const isUnavailable = showUnavailable && unavailableItems.find(un => un.name === item.name);
            return (
              <div className={`order-card ${isUnavailable ? 'unavailable' : ''}`} key={index}>
                <div className="left">
                  <div className="veg-icon" />
                  <div className="details">
                    <h4>{item.name}</h4>
                    <p>{item.customizeNote || 'No customization'}</p>
                    <button className="edit-btn" disabled={isUnavailable}>
                      Edit <span className="material-symbols-rounded arrow-icon">arrow_right</span>
                    </button>
                  </div>
                </div>
                <div className="right">
                  <div className="qty-control">
                    <button onClick={() => handleQtyChange(index, -1)} disabled={isUnavailable}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleQtyChange(index, 1)} disabled={isUnavailable}>+</button>
                  </div>
                  <div className="price">
                    <span className="strike">₹{item.oldPrice * item.qty}</span>
                    <strong>₹{item.price}</strong>
                  </div>
                </div>

                {isUnavailable && (
                  <div className="delete-badge" onClick={() => removeUnavailableItem(item.name)}>
                    <span className="material-symbols-rounded">delete</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="price-summary">
          <div><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div><span>GST (5%)</span><span>₹{gst}</span></div>
          <div className="total-line"><span>Total</span><span>₹{total}</span></div>
        </div>

        {/* Unavailable Warning Message */}
        {showUnavailable && unavailableItems.length > 0 && (
          <div className="unavailable-warning">
            <div className="unavailable-title">
              <span className="material-symbols-rounded unavailable-icon">report</span>
              {unavailableItems.length} Item Unavailable
            </div>
            <p>Sorry! Few items are now out of stock.</p>
            <button className="remove-btn" onClick={removeUnavailable}>Remove Unavailable Items</button>
          </div>
        )}
      </div>

      <div className="order-actions">
        <button className="proceed-btn" onClick={handleProceed}>Proceed to Order</button>
        <button className="back-btn" onClick={() => navigate('/menu')}>Back to Menu</button>
      </div>

      {checkingAvailability && (
        <div className="checking-modal-overlay">
          <div className="checking-modal">
            <p className="checking-text">Please wait Availability Checking</p>
            <img src={loadingGif} alt="Loading..." className="checking-gif" />
          </div>
        </div>
      )}
    </div>
  );
}
