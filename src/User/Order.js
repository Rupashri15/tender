// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [stage, setStage] = useState('confirmed');
  const [loading, setLoading] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [quantity, setQuantity] = useState(2); // default quantity
  const [showBellPopup, setShowBellPopup] = useState(false);
  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');




  const handleQtyChange = (index, delta) => {
  const updatedItems = [...cartItems];
  const newQty = updatedItems[index].qty + delta;

  if (newQty <= 0) {
    // Remove item if quantity drops to 0
    updatedItems.splice(index, 1);
  } else {
    // Update quantity and price
    updatedItems[index].qty = newQty;
    updatedItems[index].price = newQty * updatedItems[index].oldPrice;
  }

  setCartItems(updatedItems);
};


  // const handleQtyChange = (index, delta) => {
  //   const updatedItems = [...cartItems];
  //   updatedItems[index].qty = Math.max(1, updatedItems[index].qty + delta);
  //   updatedItems[index].price = updatedItems[index].qty * updatedItems[index].oldPrice;
  //   setCartItems(updatedItems);
  // };

  const handleProceed = () => {
    if (availabilityChecked) {
      handleOrder();
      return;
    }

    setCheckingAvailability(true);
    setShowUnavailable(false);

    setTimeout(() => {
      const unavailable = cartItems.filter((item) => item.name === 'Oreo Milkshake');
      setUnavailableItems(unavailable);

      if (unavailable.length > 0) {
        setTimeout(() => {
          setShowUnavailable(true);
          setCheckingAvailability(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setCheckingAvailability(false);
          setAvailabilityChecked(true);
          handleOrder();
        }, 1500);
      }
    }, 1500);
  };

  const removeUnavailable = () => {
    const remaining = cartItems.filter(
      (item) => !unavailableItems.find((un) => un.name === item.name)
    );
    setCartItems(remaining);
    setUnavailableItems([]);
    setShowUnavailable(false);
    setAvailabilityChecked(true);
  };

  const removeUnavailableItem = (name) => {
    const remaining = cartItems.filter(item => item.name !== name);
    const stillUnavailable = unavailableItems.filter(item => item.name !== name);
    setCartItems(remaining);
    setUnavailableItems(stillUnavailable);
    if (stillUnavailable.length === 0) {
      setShowUnavailable(false);
      setAvailabilityChecked(true);
    }
  };

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPaymentModal(true);
    }, 2000);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);

    const updatedItems = cartItems.map(item => ({
      ...item,
      status: 'Preparing'
    }));
    setCartItems(updatedItems);

    setTimeout(() => {
      setOrderConfirmed(true);
      setStage('confirmed');

      setTimeout(() => {
        setStage('preparing');

        setCartItems(prevItems =>
          prevItems.map(item => ({
            ...item,
            status: 'Prepared'
          }))
        );

        setTimeout(() => {
          setStage('ready');
        }, 5000);
      }, 5000);
    }, 500);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  useEffect(() => {
  if (showUnavailable && unavailableItems.length > 0) {
    document.body.classList.add('with-unavailable-warning');
  } else {
    document.body.classList.remove('with-unavailable-warning');
  }

  return () => {
    document.body.classList.remove('with-unavailable-warning');
  };
}, [showUnavailable, unavailableItems]);


  return (
    <div className={`order-page ${orderConfirmed ? 'confirmation-only' : ''}`}>

      {!orderConfirmed && (
  <>

  <div className="order-content">
  {/* Reward Banner */}
  <div className="reward-banner">🥳 You earned ₹26 Points on this order</div>
  <br/>

  {/* Cart Items */}
  <div className="order-card">
    <div className="grouped-scroll-container">
      <div className="grouped-items">
        {cartItems.map((item, index) => {
          const isUnavailable = showUnavailable && unavailableItems.find(un => un.name === item.name);
          return (
            <div className={`order-item ${isUnavailable ? 'unavailable' : ''}`} key={index}>
              {/* Left Side */}
              <div className="left">
                <div className="veg-icon" />
                <div className="details">
  <h4>{item.name}</h4>

  {/* Show customization note only if it exists */}
  {item.customizeNote && <p>{item.customizeNote}</p>}

  {/* Show Edit button only if customization is available */}
  {item.customizeNote && (
    <button
      className="edit-btn"
      disabled={isUnavailable}
      onClick={() => setShowCustomizationPanel(true)}
    >
      Edit <span className="material-symbols-rounded arrow-icon">arrow_right</span>
    </button>
  )}
</div>

                {/* <div className="details">
                  <h4>{item.name}</h4>
                  <p>{item.customizeNote || 'No customization'}</p>
                  <button
                    className="edit-btn"
                    disabled={isUnavailable}
                    onClick={() => setShowCustomizationPanel(true)}
                  >
                    Edit <span className="material-symbols-rounded arrow-icon">arrow_right</span>
                  </button>
                </div> */}
              </div>

              {/* Right Side */}
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
    </div>
  </div>

  {/* Sticky Price Summary */}
  <div className="price-summary">
    <div><span>Subtotal</span><span>₹{subtotal}</span></div>
    <div><span>GST (5%)</span><span>₹{gst}</span></div>
    <div className="total-line"><span>Total</span><span>₹{total}</span></div>
  </div>

  {/* Sticky Footer (either warning or buttons) */}
  {showUnavailable && unavailableItems.length > 0 ? (
    <div className="order-footer">
      <div className="unavailable-warning">
        <div className="unavailable-title">
          <span className="material-symbols-rounded unavailable-icon">report</span>
          {unavailableItems.length} Item Unavailable
        </div>
        <p>Sorry! Few items are now out of stock.</p>
        <button className="remove-btn" onClick={removeUnavailable}>Remove Unavailable Items</button>
      </div>
    </div>
  ) : (
    <div className="order-footer">
      <button className="back-btn" onClick={() => navigate('/menu')}>Back to Menu</button>
      <button
        className="primary-btn"
        onClick={handleProceed}
        disabled={checkingAvailability || loading}
      >
        {loading ? 'Placing Order...' : 'Proceed to Order'}
      </button>
    </div>
  )}
</div>


 
  </>
)}


    
{showCustomizationPanel && (
  <div className="bottom-sheet-overlay" onClick={() => setShowCustomizationPanel(false)}>
    <div className="bottom-sheet-panel" onClick={(e) => e.stopPropagation()}>
      <p className="customization-title">Repeat last used customization?</p>

      <div className="customization-box">
        <div className="customization-left">
          <div className="veg-icon"></div>
          <div>
            <div className="juice-name">Plain Dates Shake</div>
            <div className="customization-sub">Add Country Sugar,<br />Without Ice</div>
            <button className="edit-btn">Edit <span className="material-symbols-rounded arrow-icon">arrow_right</span></button>
          </div>
        </div>

        <div className="customization-right">
          <div className="qty-selector">
            <button onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>
          <div className="customization-price">
            <span className="old-price">₹296</span>
            <span className="new-price">₹{quantity * 120}</span>
          </div>
        </div>
      </div>

      <div className="add-new-customization">+ Add New Customization</div>
    </div>
  </div>
)}



      {checkingAvailability && (
        <div className="checking-modal-overlay">
          <div className="checking-modal">
            <p className="checking-text">Please wait Availability Checking</p>
            <img src={loadingGif} alt="Loading..." className="checking-gif" />
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="payment-bottom-bar">
          <div className="payment-container">
            <h3 className="payment-title">Select Your Payment Method</h3>
            <div className="payment-options">
              <div
                className={`payment-option ${paymentMethod === 'Cash' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect("Cash")}
              >
                <div className="left-content">
                  <span className="radio-circle" />
                  <span className="label">Cash</span>
                </div>
                <span className="note note-red">You are missing &lt;10&gt; reward points</span>
              </div>
              <div
                className={`payment-option ${paymentMethod === 'Online' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect("Online")}
              >
                <div className="left-content">
                  <span className="radio-circle green" />
                  <span className="label">Online Pay</span>
                </div>
                <span className="note note-green">Get &lt;10&gt; Rewards Points Instantly</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {orderConfirmed && (
        <div className="confirmation-screen fade-in">
          <div className="confirmation-box">
            <div className="check-icon">
              {stage === "preparing" ? (
                <span className="material-symbols-rounded chef-icon">chef_hat</span>
              ) : (
                <span className="material-symbols-rounded" style={{ color: '#3E7701' }}>
                  task_alt
                </span>
              )}
            </div>

            <h2>Order #36</h2>
            <p className="order-status">
              {stage === "confirmed" && <>Order Confirmed! We're getting<br />started on your order</>}
              {stage === "preparing" && <>Your order is being freshly prepared!</>}
              {stage === "ready" && <>Your order is ready for pickup!</>}
            </p>

            <div className="order-progress-line">
  <div className="step">
    <div className={`circle filled ${["confirmed", "preparing", "ready"].includes(stage) ? "green" : "grey"}`}></div>
    <span className={`label ${["confirmed", "preparing", "ready"].includes(stage) ? "green-text" : "grey-text"}`}>
      Confirmed
    </span>
  </div>
  <div className={`line-divider ${["preparing", "ready"].includes(stage) ? (stage === "ready" ? "green" : "orange") : "grey"}`}></div>
  <div className="step">
    <div className={`circle filled ${stage === "ready" ? "green" : stage === "preparing" ? "orange" : "grey"}`}></div>
    <span className={`label ${stage === "ready" ? "green-text" : stage === "preparing" ? "orange-text" : "grey-text"}`}>
      Preparing
    </span>
  </div>
  <div className={`line-divider ${stage === "ready" ? "green" : "grey"}`}></div>
  <div className="step">
    <div className={`circle filled ${stage === "ready" ? "green" : "grey"}`}></div>
    <span className={`label ${stage === "ready" ? "green-text" : "grey-text"}`}>
      Ready
    </span>
  </div>
</div>


           {/* <div className="order-progress-line">
              { ... step progress bar code unchanged ... }
            </div>  */}

            {stage !== "ready" && (
              <div className="time-box">
                <span className="time">15 min</span>
                <p className="time-sub">Estimated time remaining</p>
              </div>
            )}

            <div className="order-details-card">
              <h4 className="order-details-title">Order Details</h4>
              <div className="line">
                <span>Total Amount:</span>
                <strong>₹{total}</strong>
              </div>
              <div className="line">
                <span>Payment Method:</span>
                <strong>{paymentMethod}</strong>
              </div>
            </div>

            <div className={`ordered-items ${stage === "preparing" || stage === "ready" ? "preparing-items" : ""}`}>
              {cartItems.map((item, index) => (
                <div key={index} className="ordered-item">
                  <div className="item-name">{item.name}</div>
                  {(stage === "preparing" || stage === "ready") && (
                    <div
                      className="item-status"
                      style={{ color: item.status === 'Prepared' ? '#3E7701' : '#F97316' }}
                    >
                      {item.status === 'Prepared' ? 'Prepared' : 'Preparing...'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {stage === "ready" && (
              <div className="feedback-buttons">
  <button className="feedback-btn" onClick={() => navigate('/feedback')}>Write your Feedback</button>
  <button className="skip-btn" onClick={() => navigate('/receipt')}>Skip</button>
</div>

              // <div className="feedback-buttons">
              //   <button className="feedback-btn">Write your Feedback</button>
              //   <button className="skip-btn">Skip</button>
              // </div>
            )}

            {stage !== "ready" && (
  <>
    <p className="footer-note">
      Please wait while we prepare<br />your order
    </p>

    {/* 🔔 Bell Icon below footer-note */}
    {/* <div className="inline-bell-container">
      <span
        className="material-symbols-rounded inline-bell"
        onClick={() => setShowBellPopup(true)}
      >
        notifications_active
      </span>
    </div> */}
  </>
)}


{/* Show bell in all stages */}
{(stage === "confirmed" || stage === "preparing" || stage === "ready") && (
  <div className="inline-bell-container">
    <span
      className="material-symbols-rounded inline-bell"
      onClick={() => setShowBellPopup(true)}
    >
      notifications_active
    </span>
  </div>
)}




          </div>
        </div>
      )}


{showBellPopup && (
  <div className="bell-popup-overlay" onClick={() => setShowBellPopup(false)}>
    <div className="bell-popup" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={() => setShowBellPopup(false)}>&times;</button>
      
      <label>Enter your name (optional)</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Name"
      />

      <label>Select Table *</label>
      <div className="select-wrapper">
        <select
          className="table-select"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        >
          <option value="">--select--</option>
          <option value="1">Table 1</option>
          <option value="2">Table 2</option>
          <option value="3">Table 3</option>
          <option value="4">Table 4</option>
          <option value="5">Table 5</option>
          <option value="6">Table 6</option>
          <option value="standing">Standing</option>
        </select>
        <span className="material-symbols-rounded select-arrow">arrow_drop_down</span>
      </div>

      <button
        className={`call-captain-btn ${userName.trim() && tableNumber ? 'enabled' : ''}`}
        disabled={!userName.trim() || !tableNumber}
      >
        Call Captain <span className="material-symbols-rounded">notifications_active</span>
      </button>
    </div>
  </div>
)}


      {/* {showBellPopup && (
  <div className="bell-popup-overlay" onClick={() => setShowBellPopup(false)}>
    <div className="bell-popup" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={() => setShowBellPopup(false)}>&times;</button>
      
      <label>Enter your name (optional)</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Name"
      />

      <label>Select Table *</label>
      <div className="select-wrapper">
        <select
          className="table-select"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        >
          <option value="">--select--</option>
          <option value="1">Table 1</option>
          <option value="2">Table 2</option>
          <option value="3">Table 3</option>
          <option value="4">Table 4</option>
          <option value="5">Table 5</option>
          <option value="6">Table 6</option>
          <option value="standing">Standing</option>
        </select>
        <span className="material-symbols-rounded select-arrow">arrow_drop_down</span>
      </div>

      <button
        className={`call-captain-btn ${userName.trim() && tableNumber ? 'enabled' : ''}`}
        disabled={!userName.trim() || !tableNumber}
      >
        Call Captain <span className="material-symbols-rounded">notifications_active</span>
      </button>
    </div>
  </div>
)} */}

    </div>
  );
}
