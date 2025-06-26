import React from 'react';
import './Menu.css';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import pistaImage from '../assets/pista.png';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png';
import userIcon from '../assets/user.png';

const items = [
  {
    name: 'Kesar Pista Coconut Shake',
    description: 'Fresh Ice Cream with Chocolate Flavor Kesar Pista Coconut Shake',
    price: 150,
    img: pistaImage,
    preferences: ['Kale', 'Ice', 'Chocolate', '+2 more']
  },
  {
    name: 'Kesar Pista Coconut Shake',
    description: 'Fresh Ice Cream with Chocolate Flavor Kesar Pista Coconut Shake',
    price: 150,
    img: pistaImage,
    preferences: ['Kale', 'Ice', 'Chocolate', '+2 more']
  },
  {
    name: 'Kesar Pista Coconut Shake',
    description: 'Fresh Ice Cream with Chocolate Flavor Kesar Pista Coconut Shake',
    price: 150,
    img: pistaImage,
    preferences: ['Kale', 'Ice', 'Chocolate', '+2 more']
  }
];

const Menu = () => {
  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header-bar">
        <div className="left">
          <img src={logo} alt="Tender Town" className="logo-img" />
          <div className="text-group">
            <h1 className="brand-title">Tender Town</h1>
            <p className="brand-subtitle">The Taste of the Nature</p>
          </div>
        </div>
        <div className="right-icons">
          <img src={cartIcon} alt="Cart" className="icon-btn" />
          <img src={userIcon} alt="User" className="icon-btn" />
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input type="text" placeholder='Search for "Juice"' />
        <FaSearch className="search-icon" />
        <FaMicrophone className="mic-icon" />
      </div>

      {/* Filter Pills */}
      <div className="filter-pills">
        <button className="pill active">All</button>
        <button className="pill">Fresh Juice</button>
        <button className="pill">Milkshake</button>
        <button className="pill">Snacks</button>
      </div>

      {/* Cards below Filter Pills */}
      <div className="sub-items">
        {items.map((item, index) => (
          <div className="sub-item-card" key={index}>
            <img src={item.img} alt={item.name} className="item-img" />
            <div className="item-details">
              <div className="title-row">
                <div className="veg-icon"></div>
                <span className="item-title">{item.name}</span>
              </div>
              <p className="item-desc">{item.description}</p>
              <div className="preferences">
                {item.preferences.map((pref, idx) => (
                  <span key={idx} className="tag">{pref}</span>
                ))}
              </div>
              <div className="bottom-row">
                <span className="price">&#8377;{item.price}</span>
                <div className="controls-row">
                  <button className="customize-btn">Customize</button>
                  <div className="quantity-control">
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item active">Menu</div>
        <div className="nav-item">Bag</div>
        <div className="nav-item">Profile</div>
      </div>
    </div>
  );
};

export default Menu;
