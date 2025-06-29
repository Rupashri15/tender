import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaMicrophone, FaTrash } from 'react-icons/fa';

import './Cart.css';
import pistaImage from '../assets/pista.png';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png';
import userIcon from '../assets/user.png';

const POINT_TARGET = 250;

const items = Array.from({ length: 6 }, (_, i) => ({
  name: `Kesar Pista Coconut Shake ${i + 1}`,
  description: 'Fresh Ice Cream with Chocolate Flavor Kesar Pista Coconut Shake',
  price: 150,
  img: pistaImage,
  preferences: ['Kale', 'Ice', 'Juice', 'Lemon', 'Ice'],
}));

const Cart = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);
  const [cartCount, setCartCount] = useState({});

  const addItem = (item) => {
    setCartCount((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
    setSelected((prev) => [...prev, item]);
  };

  const removeItem = (item) => {
    setCartCount((prev) => {
      const next = { ...prev };
      delete next[item.name];
      return next;
    });
    setSelected((prev) => prev.filter((i) => i.name !== item.name));
  };

  const itemCount = selected.length;
  const grandTotal = selected.reduce((sum, item) => sum + item.price, 0);
  const toTarget = Math.max(0, POINT_TARGET - grandTotal);

  return (
    <div className="menu-page">
      <div className="menu-header-bar">
        <div className="left">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="text-group">
            <h1 className="brand-title">Tender Town</h1>
            <p className="brand-subtitle">The Taste of the Nature</p>
          </div>
        </div>
        <div className="right-icons">
          <div className="icon-btn cart-icon-wrapper">
            <img src={cartIcon} alt="Cart" />
            {itemCount > 0 && <span className="cart-badge-icon">{itemCount}</span>}
          </div>
          <img src={userIcon} alt="User" className="icon-btn" />
        </div>
      </div>

      <div className="search-wrapper">
        {!showSearch && (
          <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
            <FaSearch />
          </div>
        )}
        <div className="filter-pills">
          <button className="pill active">All</button>
          <button className="pill">Fresh Juice</button>
          <button className="pill">Milkshake</button>
          <button className="pill">Snacks</button>
        </div>
      </div>

      {showSearch && (
        <div className="search-bar visible">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search for "Juice"'
          />
          <FaTimes className="close-icon" onClick={() => setShowSearch(false)} />
          <FaSearch className="search-icon" />
          <FaMicrophone className="mic-icon" />
        </div>
      )}

      <div className="sub-items">
        {items.map((it, idx) => (
          <div key={idx} className="sub-item-card">
            <div className="item-details">
              <div className="title-row">
                <span className="item-title">{it.name}</span>
                <div className="veg-icon" />
              </div>
              <p className="item-desc">{it.description}</p>
              <div className="price-and-preferences">
                <span className="price">₹{it.price}</span>
                <div className="preferences">
                  {it.preferences.slice(0, 2).map((p) => (
                    <span key={p} className="tag">{p}</span>
                  ))}
                  {it.preferences.length > 2 && (
                    <span
                      className="tag clickable"
                      onClick={(e) => {
                        const el = e.currentTarget.parentElement;
                        el.innerHTML = it.preferences
                          .map((p) => `<span class=\"tag\">${p}</span>`)
                          .join('');
                      }}
                    >
                      +{it.preferences.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="item-img-wrapper">
              {cartCount[it.name] > 0 && (
                <div className="delete-icon" onClick={() => removeItem(it)}>
                  <FaTrash />
                </div>
              )}
              <img src={it.img} alt={it.name} className="item-img" />
              {cartCount[it.name] > 0 && (
                <div className="product-badge">{cartCount[it.name]}</div>
              )}
              <button className="add-btn" onClick={() => addItem(it)}>ADD</button>

              {/* <button className="add-btn" onClick={() => addItem(it)}>
                <span style={{ color: 'green', backgroundColor: 'white', padding: '4px 10px', borderRadius: '12px' }}>ADD</span>
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {itemCount > 0 && (
        <div className="cart-summary-banner">
          <div className="summary-top">
            {itemCount} item{itemCount > 1 ? 's' : ''} added
          </div>
          <div className="summary-bottom">
            {toTarget === 0
              ? 'You just earned 50 points! 🎉'
              : `Add items worth ₹${toTarget} more to get 50 points`}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
