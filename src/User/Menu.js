import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './Menu.css';
import pistaImage from '../assets/pista.png';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png';
import userIcon from '../assets/user.png';

const CustomizeModal = ({ selectedItems, onClose, onAddToCart }) => {
  const [customizations, setCustomizations] = useState(
    selectedItems.map(() => ({
      quantity: 1,
      size: 'Regular',
      sugar: 'Medium',
      ice: 'Normal',
      addOns: [],
    }))
  );

  const [currentItem, setCurrentItem] = useState(0);
  const item = selectedItems[currentItem];
  const cust = customizations[currentItem];

  const addonOptions = [
    { label: 'Extra Cheese', price: 10 },
    { label: 'Extra Egg', price: 10 },
    { label: 'Extra Moines', price: 10 },
  ];

  const update = (key, value) => {
    setCustomizations((prev) => {
      const next = [...prev];
      next[currentItem] = { ...next[currentItem], [key]: value };
      return next;
    });
  };

  const toggleAddon = (label) => {
    update(
      'addOns',
      cust.addOns.includes(label)
        ? cust.addOns.filter((x) => x !== label)
        : [...cust.addOns, label]
    );
  };

  const calcTotal = (item, c) => {
    const size = c.size === 'Large + 40rs' ? 40 : 0;
    const sugar = c.sugar === 'High + 5rs' ? 5 : 0;
    const ice = c.ice === 'No Ice + 10rs' ? 10 : 0;
    const addons = c.addOns.length * 10;
    return (item.price + size + sugar + ice + addons) * c.quantity;
  };

  const grandTotal = selectedItems.reduce(
    (sum, it, idx) => sum + calcTotal(it, customizations[idx]),
    0
  );

  const handleAdd = () => {
    const newItems = selectedItems.map((it, idx) => ({
      ...it,
      ...customizations[idx],
      totalPrice: calcTotal(it, customizations[idx]),
    }));
    onAddToCart(newItems);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h3>Customize Your Order</h3>
        <hr className="modal-divider" />

        <p className="customize-count">
          Customization for item {currentItem + 1} of {selectedItems.length}
        </p>

        <div className="modal-item">
          <img src={item.img} alt={item.name} className="modal-img" />
          <div>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <div className="modal-tags">
              {item.preferences.map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="option-section">
          <h5>Size</h5>
          <div className="option-buttons">
            {['Regular', 'Large + 40rs'].map((s) => (
              <button
                key={s}
                className={cust.size === s ? 'selected' : ''}
                onClick={() => update('size', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section">
          <h5>Sugar Level</h5>
          <div className="option-buttons">
            {['No Sugar', 'Low', 'Medium', 'High + 5rs'].map((s) => (
              <button
                key={s}
                className={cust.sugar === s ? 'selected' : ''}
                onClick={() => update('sugar', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section">
          <h5>Ice Level</h5>
          <div className="option-buttons">
            {['Normal', 'Less ice', 'No Ice + 10rs', 'Extra'].map((s) => (
              <button
                key={s}
                className={cust.ice === s ? 'selected' : ''}
                onClick={() => update('ice', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section">
          <h5>Add‑ons</h5>
          {addonOptions.map((a) => (
            <div
              key={a.label}
              className={`addon-row ${cust.addOns.includes(a.label) ? 'selected' : ''}`}
              onClick={() => toggleAddon(a.label)}
            >
              <span>{a.label}</span>
              <span>₹{a.price}</span>
            </div>
          ))}
        </div>

        <div className="option-section">
          <h5>Quantity</h5>
          <div className="quantity-row">
            <button onClick={() => update('quantity', Math.max(1, cust.quantity - 1))}>−</button>
            <span>{cust.quantity}</span>
            <button onClick={() => update('quantity', cust.quantity + 1)}>+</button>
          </div>
        </div>

        <div className="modal-footer">
          {selectedItems.length > 1 && (
            <div className="modal-pagination">
              <button
                onClick={() => setCurrentItem((prev) => Math.max(0, prev - 1))}
                disabled={currentItem === 0}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentItem((prev) => Math.min(selectedItems.length - 1, prev + 1))}
                disabled={currentItem === selectedItems.length - 1}
              >
                Next
              </button>
            </div>
          )}
          <button className="add-to-cart" onClick={handleAdd}>
            Add to Cart – ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
};

const items = Array.from({ length: 6 }, (_, i) => ({
  name: `Kesar Pista Coconut Shake ${i + 1}`,
  description: 'Fresh Ice Cream with Chocolate Flavor Kesar Pista Coconut Shake',
  price: 150,
  img: pistaImage,
  preferences: ['Kale', 'Ice', 'Juice', 'Lemon', 'Ice'],
}));

const Menu = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState({});
  const [showCustomizeBar, setShowCustomizeBar] = useState(false);

  const addItem = (item) => {
    setCartCount((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
    setSelected((prev) => [...prev, item]);
    setShowCustomizeBar(true);
  };

  const handleAddToCart = (newItems) => {
    const old = JSON.parse(localStorage.getItem('cart')) || [];
    const saved = [...old, ...newItems];
    localStorage.setItem('cart', JSON.stringify(saved));
    navigate('/cart');
  };

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
          <img src={cartIcon} alt="Cart" className="icon-btn" />
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
                          .map((p) => `<span class="tag">${p}</span>`)
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
              <img src={it.img} alt={it.name} className="item-img" />
              {cartCount[it.name] > 0 && (
                <div className="product-badge">{cartCount[it.name]}</div>
              )}
              <button className="add-btn" onClick={() => addItem(it)}>ADD</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CustomizeModal
          selectedItems={selected}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCustomizeBar && (
        <div className="customize-all-wrapper">
          <button className="customize-all-btn" onClick={() => setShowModal(true)}>
            Customize Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

