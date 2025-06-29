import React, { useState } from "react";
import "./CustomCart.css";
import logo from '../assets/logo.png';
import pistaImage from "../assets/pista.png"; 
import { RiDeleteBin6Line } from "react-icons/ri";

const CustomCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Kesar Pista Coconut Shake",
      sugar: "Medium",
      ice: "Normal",
      price: 300,
      qty: 4,
    },
    {
      id: 2,
      title: "Kesar Pista Coconut Shake",
      sugar: "Medium",
      ice: "No Ice + 10rs",
      price: 160,
      qty: 1,
    },
  ]);

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

  return (
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
    <button className="delete-btn" onClick={() => removeItem(item.id)}>
  <RiDeleteBin6Line />
</button>

  {/* <button className="delete-btn" onClick={() => removeItem(item.id)}>🗑</button> */}
  <button className="customize-btn">Customize</button>

  <div className="qty">
    <button onClick={() => decreaseQty(item.id)}>-</button>
    <button className="number">{item.qty}</button>
    <button onClick={() => increaseQty(item.id)}>+</button>
  </div>

  <div className="item-price">${item.price * item.qty}</div>
</div>

            {/* <div className="item-controls">
              <button onClick={() => removeItem(item.id)}>🗑</button>
              <button className="customize-btn">Customize</button>

              <div className="qty">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <div className="item-price">${item.price * item.qty}</div>
            </div> */}
          </div>
        </div>
      ))}

      <div className="summary">
        <div className="line">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="line">
          <span>GST (5%)</span>
          <span>$0</span>
        </div>
        <div className="line total">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
      </div>

      <button className="btn proceed">Proceed to Order</button>
      <button className="btn back">Back to Menu</button>
    </div>
  );
};

export default CustomCart;
