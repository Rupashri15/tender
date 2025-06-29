import React, { useState } from 'react';
import './Customize.css'; // You already have the full CSS

import pistaImage from '../assets/pista.png';

const Customize = ({ location, navigate }) => {
  const item = location?.state?.item || {
    name: 'Kesar Pista Coconut Shake',
    description: 'Fresh Ice Cream with Chocolate Flavor',
    price: 150,
    img: pistaImage,
    preferences: ['Kale', 'Ice', '+2 more']
  };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Regular');
  const [sugar, setSugar] = useState('Medium');
  const [ice, setIce] = useState('Normal');
  const [addOns, setAddOns] = useState([]);

  const addonOptions = [
    { label: 'Extra Cheese', price: 10 },
    { label: 'Extra Egg', price: 10 },
    { label: 'Extra Moines', price: 10 }
  ];

  const toggleAddon = (label) => {
    setAddOns((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const sizePrice = size === 'Large + 40rs' ? 40 : 0;
  const sugarPrice = sugar === 'High + 5rs' ? 5 : 0;
  const icePrice = ice === 'No Ice + 10rs' ? 10 : 0;
  const addOnPrice = addOns.length * 10;

  const total = (item.price + sizePrice + sugarPrice + icePrice + addOnPrice) * quantity;

  return (
    <div className="customize-page">
      <div className="customize-header">
        <h2>Customize Your Order</h2>
      </div>

      <div className="customize-item">
        <img src={item.img} alt={item.name} className="customize-img" />
        <div className="customize-item-details">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <div className="customize-tags">
            {item.preferences.map((p, i) => <span key={i}>{p}</span>)}
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="option-section">
        <h5>Size</h5>
        <div className="option-buttons">
          <button className={size === 'Regular' ? 'selected' : ''} onClick={() => setSize('Regular')}>Regular</button>
          <button className={size === 'Large + 40rs' ? 'selected' : ''} onClick={() => setSize('Large + 40rs')}>Large + 40rs</button>
        </div>
      </div>

      {/* Sugar */}
      <div className="option-section">
        <h5>Sugar Level</h5>
        <div className="option-buttons">
          {['No Sugar', 'Low', 'Medium', 'High + 5rs'].map((level) => (
            <button key={level} className={sugar === level ? 'selected' : ''} onClick={() => setSugar(level)}>{level}</button>
          ))}
        </div>
      </div>

      {/* Ice */}
      <div className="option-section">
        <h5>Ice Level</h5>
        <div className="option-buttons">
          {['Normal', 'Less ice', 'No Ice + 10rs', 'Extra'].map((option) => (
            <button key={option} className={ice === option ? 'selected' : ''} onClick={() => setIce(option)}>{option}</button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="option-section">
        <h5>Add Ons</h5>
        {addonOptions.map((a) => (
          <div key={a.label} className="addon-row" onClick={() => toggleAddon(a.label)}>
            <span>{a.label}</span>
            <span>Rs.{a.price}</span>
          </div>
        ))}
      </div>

      {/* Quantity */}
      <div className="quantity-row">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>

      {/* Add to Cart */}
      <button className="add-to-cart">Add to Cart - ₹{total}</button>
    </div>
  );
};

export default Customize;
