import React from 'react';
import './MenuManagement.css';
import item1 from '../assets/shake.png';
import item2 from '../assets/pine.png';
import item3 from '../assets/straw.png';

const MenuManagement = () => {
  return (
    <div className="menu-page">
      <header className="admin-header">
        <p>Welcome, Pradhap!</p>
        <div className="filter-icon">⚙️</div>
      </header>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="voice-btn">🎤</button>
      </div>

      <div className="banner-box">
        <p>You can now edit your menu <br /><strong>directly from your mobile</strong></p>
        <img src="https://via.placeholder.com/80" alt="Phone" />
      </div>

      <div className="menu-section">
        <div className="menu-header">
          <strong>Tender Town Signature Shakes<br /><span>(Healthy & Detoxification)</span></strong>
          <div className="discount">Discount 10%</div>
        </div>

        <button className="add-item">➕ Add an item</button>

        <div className="menu-item">
          <img src={item1} alt="item" />
          <div className="item-details">
            <p className="item-name">Kesar Pista Coconut Shake</p>
            <p className="item-price">₹150</p>
            <div className="item-actions">
              <span>Preview</span>
              <span>Edit</span>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="menu-item">
          <img src={item2} alt="item" />
          <div className="item-details">
            <p className="item-name">Pineapple Coconut Shake</p>
            <p className="item-price">₹240</p>
            <div className="item-actions">
              <span>Preview</span>
              <span>Edit</span>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="menu-item">
          <img src={item3} alt="item" />
          <div className="item-details">
            <p className="item-name">Strawberry Coconut Shake</p>
            <p className="item-price">₹240</p>
            <div className="item-actions">
              <span>Preview</span>
              <span>Edit</span>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <button className="fab">＋</button>

      <nav className="bottom-nav">
        <span>📦 Orders</span>
        <span className="active">🍹 Menu</span>
        <span>📁 Category</span>
        <span>👤 Profile</span>
      </nav>
    </div>
  );
};

export default MenuManagement;
