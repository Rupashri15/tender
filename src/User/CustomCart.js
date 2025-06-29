// import React, { useState } from "react";
// import "./CustomCart.css";
// import logo from '../assets/logo.png';
// import pistaImage from "../assets/pista.png";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { GiChefToque } from "react-icons/gi";

// const CustomCart = () => {
//   const [items, setItems] = useState([
//     { id: 1, title: "Kesar Pista Coconut Shake", sugar: "Medium", ice: "Normal", price: 120, qty: 2 },
//     { id: 2, title: "Fried Rice", sugar: "", ice: "", price: 60, qty: 1 },
//     { id: 3, title: "Pani Puri", sugar: "", ice: "", price: 40, qty: 1 },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [stage, setStage] = useState("confirmed");

//   const increaseQty = (id) => {
//     setItems(items.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item));
//   };

//   const decreaseQty = (id) => {
//     setItems(items.map((item) => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
//   };

//   const removeItem = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const clearAll = () => {
//     setItems([]);
//   };

//   const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const handleOrder = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setShowPaymentModal(true);
//     }, 2000);
//   };

//   const handlePaymentSelect = (method) => {
//     setPaymentMethod(method);
//     setShowPaymentModal(false);
//     setTimeout(() => {
//       setOrderConfirmed(true);
//       setStage("confirmed");

//       setTimeout(() => {
//         setStage("preparing");

//         setTimeout(() => {
//           setStage("ready");
//         }, 5000);
//       }, 5000);
//     }, 500);
//   };

//   return (
//     <>
//       {loading && (
//         <div className="loader-overlay">
//           <div className="loader-content">
//             <p>Please wait Confirmation</p>
//             <div className="loader-circle"></div>
//           </div>
//         </div>
//       )}

//       {showPaymentModal && (
//         <div className="modal-overlay">
//           <div className="payment-modal">
//             <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
//             <h3>Select your Payment Method</h3>
//             <div className="payment-option" onClick={() => handlePaymentSelect("Cash")}>
//               <label><input type="radio" name="payment" /><span>Cash</span></label>
//               <span className="note-red">You are missing &lt;10&gt; reward points</span>
//             </div>
//             <div className="payment-option" onClick={() => handlePaymentSelect("Online")}>
//               <label><input type="radio" name="payment" /><span>Online Pay</span></label>
//               <span className="note-green">Get &lt;10&gt; Rewards Points Instantly</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {orderConfirmed ? (
//         <div className="confirmation-screen">
//           <div className="confirmation-box">
//             <div className="check-icon">
//               {stage === "preparing" ? <GiChefToque size={30} color="black" /> : "✅"}
//             </div>
//             <h2>Order #36</h2>
//             <p className="order-status">
//               {stage === "confirmed" && <>Order Confirmed! We're getting<br />started on your order</>}
//               {stage === "preparing" && <>Your order is being freshly prepared!</>}
//               {stage === "ready" && <>Your order is ready for pickup!</>}
//             </p>

//             {/* ✅ Stage Progress */}
//             <div className="order-progress-line">
//               {/* Confirmed */}
//               <div className="step">
//                 <div className={`circle filled ${["confirmed", "preparing", "ready"].includes(stage) ? "green" : "grey"}`}></div>
//                 <span className={`label ${["confirmed", "preparing", "ready"].includes(stage) ? "green-text" : "grey-text"}`}>Confirmed</span>
//               </div>

//               <div className="line-divider"></div>

//               {/* Preparing */}
//               <div className="step">
//                 <div className={`circle filled ${stage === "ready" ? "green" : stage === "preparing" ? "orange" : "grey"}`}></div>
//                 <span className={`label ${stage === "ready" ? "green-text" : stage === "preparing" ? "orange-text" : "grey-text"}`}>Preparing</span>
//               </div>

//               <div className="line-divider"></div>

//               {/* Ready */}
//               <div className="step">
//                 <div className={`circle filled ${stage === "ready" ? "green" : "grey"}`}></div>
//                 <span className={`label ${stage === "ready" ? "green-text" : "grey-text"}`}>Ready</span>
//               </div>
//             </div>

//             {stage !== "ready" && (
//               <div className="time-box">
//                 <span className="time">15 min</span>
//                 <p className="time-sub">Estimated time remaining</p>
//               </div>
//             )}

//             <div className="order-details-card">
//               <h4 className="order-details-title">Order Details</h4>
//               <div className="line">
//                 <span>Total Amount:</span>
//                 <strong>${subtotal}</strong>
//               </div>
//               <div className="line">
//                 <span>Payment Method:</span>
//                 <strong>{paymentMethod}</strong>
//               </div>
//             </div>

//             {stage === "confirmed" && (
//               <div className="ordered-items">
//                 {items.map((item) => (
//                   <div key={item.id} className="ordered-item">{item.title}</div>
//                 ))}
//               </div>
//             )}

//             {stage === "ready" && (
//               <div className="pickup-box">
//                 <button className="pickup-btn">Ready to Pickup</button>
//               </div>
//             )}

//             <p className="footer-note">
//               Please wait while we prepare<br />your order
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="custom-cart-container">
//           <div className="cart-header">
//             <div className="title">
//               <img src={logo} alt="logo" />
//               <span>Your Tender Town Cart</span>
//             </div>
//             <span className="clear" onClick={clearAll}>Clear All</span>
//           </div>

//           {items.map((item) => (
//             <div className="cart-item" key={item.id}>
//               <img src={pistaImage} alt="shake" className="item-image" />
//               <div className="item-details">
//                 <h4>{item.title}</h4>
//                 <p>Sugar: {item.sugar}</p>
//                 <p>Ice: {item.ice}</p>
//                 <div className="item-controls">
//                   <button className="delete-btn" onClick={() => removeItem(item.id)}><RiDeleteBin6Line /></button>
//                   <button className="customize-btn">Customize</button>
//                   <div className="qty">
//                     <button onClick={() => decreaseQty(item.id)}>-</button>
//                     <button className="number">{item.qty}</button>
//                     <button onClick={() => increaseQty(item.id)}>+</button>
//                   </div>
//                   <div className="item-price">${item.price * item.qty}</div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="summary">
//             <div className="line"><span>Subtotal</span><span>${subtotal}</span></div>
//             <div className="line"><span>GST (5%)</span><span>$0</span></div>
//             <div className="line total"><span>Total</span><span>${subtotal}</span></div>
//           </div>

//           <button className="btn proceed" onClick={handleOrder}>Proceed to Order</button>
//           <button className="btn back">Back to Menu</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomCart;


import React, { useState } from "react";
import "./CustomCart.css";
import logo from '../assets/logo.png';
import pistaImage from "../assets/pista.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiChefToque } from "react-icons/gi";

const CustomCart = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Kesar Pista Coconut Shake", sugar: "Medium", ice: "Normal", price: 120, qty: 2 },
    { id: 2, title: "Fried Rice", sugar: "", ice: "", price: 60, qty: 1 },
    { id: 3, title: "Pani Puri", sugar: "", ice: "", price: 40, qty: 1 },
  ]);

  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [stage, setStage] = useState("confirmed");

  const increaseQty = (id) => {
    setItems(items.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setItems(items.map((item) => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

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
    setTimeout(() => {
      setOrderConfirmed(true);
      setStage("confirmed");

      setTimeout(() => {
        setStage("preparing");

        setTimeout(() => {
          setStage("ready");
        }, 5000);
      }, 5000);
    }, 500);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <p>Please wait Confirmation</p>
            <div className="loader-circle"></div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            <h3>Select your Payment Method</h3>
            <div className="payment-option" onClick={() => handlePaymentSelect("Cash")}>
              <label><input type="radio" name="payment" /><span>Cash</span></label>
              <span className="note-red">You are missing &lt;10&gt; reward points</span>
            </div>
            <div className="payment-option" onClick={() => handlePaymentSelect("Online")}>
              <label><input type="radio" name="payment" /><span>Online Pay</span></label>
              <span className="note-green">Get &lt;10&gt; Rewards Points Instantly</span>
            </div>
          </div>
        </div>
      )}

      {orderConfirmed ? (
        <div className="confirmation-screen">
          <div className="confirmation-box">
            <div className="check-icon">
              {stage === "preparing" ? <GiChefToque size={30} color="black" /> : "✅"}
            </div>
            <h2>Order #36</h2>
            <p className="order-status">
              {stage === "confirmed" && <>Order Confirmed! We're getting<br />started on your order</>}
              {stage === "preparing" && <>Your order is being freshly prepared!</>}
              {stage === "ready" && <>Your order is ready for pickup!</>}
            </p>

            {/* ✅ Stepper Progress */}
            <div className="order-progress-line">
              {/* Confirmed */}
              <div className="step">
                <div className={`circle filled ${["confirmed", "preparing", "ready"].includes(stage) ? "green" : "grey"}`}></div>
                <span className={`label ${["confirmed", "preparing", "ready"].includes(stage) ? "green-text" : "grey-text"}`}>Confirmed</span>
              </div>

              {/* Divider */}
              <div className={`line-divider ${["preparing", "ready"].includes(stage) ? (stage === "ready" ? "green" : "orange") : "grey"}`}></div>

              {/* Preparing */}
              <div className="step">
                <div className={`circle filled ${stage === "ready" ? "green" : stage === "preparing" ? "orange" : "grey"}`}></div>
                <span className={`label ${stage === "ready" ? "green-text" : stage === "preparing" ? "orange-text" : "grey-text"}`}>Preparing</span>
              </div>

              {/* Divider */}
              <div className={`line-divider ${stage === "ready" ? "green" : "grey"}`}></div>

              {/* Ready */}
              <div className="step">
                <div className={`circle filled ${stage === "ready" ? "green" : "grey"}`}></div>
                <span className={`label ${stage === "ready" ? "green-text" : "grey-text"}`}>Ready</span>
              </div>
            </div>

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
                <strong>${subtotal}</strong>
              </div>
              <div className="line">
                <span>Payment Method:</span>
                <strong>{paymentMethod}</strong>
              </div>
            </div>

            {stage === "confirmed" && (
              <div className="ordered-items">
                {items.map((item) => (
                  <div key={item.id} className="ordered-item">{item.title}</div>
                ))}
              </div>
            )}

            {stage === "ready" && (
              <div className="pickup-box">
                <button className="pickup-btn">Ready to Pickup</button>
              </div>
            )}

           {stage !== "ready" && (
  <p className="footer-note">
    Please wait while we prepare<br />your order
  </p>
)}

          </div>
        </div>
      ) : (
        <div className="custom-cart-container">
          <div className="cart-header">
            <div className="title">
              <img src={logo} alt="logo" />
              <span>Your Tender Town Cart</span>
            </div>
            <span className="clear" onClick={clearAll}>Clear All</span>
          </div>

          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={pistaImage} alt="shake" className="item-image" />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>Sugar: {item.sugar}</p>
                <p>Ice: {item.ice}</p>
                <div className="item-controls">
                  <button className="delete-btn" onClick={() => removeItem(item.id)}><RiDeleteBin6Line /></button>
                  <button className="customize-btn">Customize</button>
                  <div className="qty">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <button className="number">{item.qty}</button>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <div className="item-price">${item.price * item.qty}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="summary">
            <div className="line"><span>Subtotal</span><span>${subtotal}</span></div>
            <div className="line"><span>GST (5%)</span><span>$0</span></div>
            <div className="line total"><span>Total</span><span>${subtotal}</span></div>
          </div>

          <button className="btn proceed" onClick={handleOrder}>Proceed to Order</button>
          <button className="btn back">Back to Menu</button>
        </div>
      )}
    </>
  );
};

export default CustomCart;
