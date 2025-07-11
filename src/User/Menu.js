import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Juice1 from '../assets/Juice 1.png';
import Juice2 from '../assets/Juice 2.png';
import Juice3 from '../assets/Juice 3.png';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png';
import userIcon from '../assets/user.png';
import fav from '../assets/favorite.png';
import delIcon from '../assets/delete.png';


const items = [
  {
    name: 'Oreo Milkshake',
    description: 'Indulge in the creamy blend of Oreo and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice1,
    customizable: false,
  },
  {
    name: 'ABC Juice',
    description: 'Combination of Apple, Beetroot, and Carrot',
    price: 109,
    oldPrice: 218,
    img: Juice2,
    customizable: false,
  },
  {
    name: 'Plain Dates Shake',
    description: 'Indulge in the creamy blend of dates and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice3,
    customizable: true,
  },
  {
    name: 'Oreo Milkshake',
    description: 'Indulge in the creamy blend of Oreo and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice1,
    customizable: false,
  },
  {
    name: 'ABC Juice',
    description: 'Combination of Apple, Beetroot, and Carrot',
    price: 109,
    oldPrice: 218,
    img: Juice2,
    customizable: false,
  },
  {
    name: 'Plain Dates Shake',
    description: 'Indulge in the creamy blend of dates and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice3,
    customizable: true,
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState({});
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [selectedSugar, setSelectedSugar] = useState('');
  const [selectedIce, setSelectedIce] = useState('');
  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [showBellPopup, setShowBellPopup] = useState(false);
  const [sort, setSort] = useState('');
  const [preference, setPreference] = useState('');
  const [topPick, setTopPick] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const addItem = (item) => {
    setCartCount((prev) => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
  };

  const removeItem = (item) => {
    setCartCount((prev) => {
      const updated = { ...prev };
      if (updated[item.name] > 1) updated[item.name]--;
      else delete updated[item.name];
      return updated;
    });
  };

  const handleAddClick = (item) => {
    if (item.customizable) {
      setCustomizeItem(item);
      setShowCustomizeModal(true);
      setModalQty(1);
      setSelectedSugar('');
      setSelectedIce('');
    } else {
      addItem(item);
    }
  };

  const handleCloseCustomize = () => {
    setShowCustomizeModal(false);
    setCustomizeItem(null);
  };

  const handleAddFromModal = () => {
    setCartCount((prev) => ({
      ...prev,
      [customizeItem.name]: (prev[customizeItem.name] || 0) + modalQty,
    }));
    handleCloseCustomize();
  };

  const sugarOptions = [
    { name: 'Less Sugar', price: 1 },
    { name: 'Add Honey Instead Of Sugar', price: 20 },
    { name: 'Add Country Sugar', price: 15 },
  ];

  const iceOptions = [
    { name: 'Without Ice', price: 20 },
    { name: 'Extra Ice', price: 1 },
  ];

  const getOptionPrice = () => {
    const sugar = sugarOptions.find((opt) => opt.name === selectedSugar)?.price || 0;
    const ice = iceOptions.find((opt) => opt.name === selectedIce)?.price || 0;
    return sugar + ice;
  };

  const totalOldPrice = (customizeItem?.oldPrice || 0) * modalQty;
  const totalNewPrice = (customizeItem?.price || 0) * modalQty + getOptionPrice();

  // Total items in cart
const totalItems = Object.values(cartCount).reduce((sum, qty) => sum + qty, 0);

const rewardThreshold = 450; // ✅ only place where 250 is defined

// Total amount in cart (approximate without customization cost)
const totalAmount = items.reduce((sum, item) => {
  const qty = cartCount[item.name] || 0;
  return sum + qty * item.price;
}, 0);


const amountLeftForReward = Math.max(0, rewardThreshold - totalAmount);
const roundedAmountLeft = Math.ceil(amountLeftForReward); // ← rounded value to avoid ₹0.4 kind of values

const [showCartModal, setShowCartModal] = useState(false);



  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header-bar">
        <div className="left">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="text-group">
            <h1 className="brand-title">Tender Town</h1>
            <p className="brand-subtitle">The Taste of the Nature</p>
          </div>
        </div>
        <div className="right-icons">
          <button className="status-btn">
            Online <span className="material-symbols-rounded">chevron_right</span>
          </button>
          <div className="cart-icon-wrapper">
  <img src={cartIcon} alt="Cart" className="icon-btn" />
  {totalItems > 0 && (
    <span className="cart-badge">{totalItems}</span>
  )}
</div>

          {/* <img src={cartIcon} alt="Cart" className="icon-btn" /> */}
          <img src={userIcon} alt="User" className="icon-btn" />
        </div>
      </div>

      {/* Search and Filter Pills */}
      <div className="search-wrapper">
        {!showSearch ? (
          <>
            <span className="material-symbols-rounded filter-icon" onClick={() => setShowFilterModal(true)}>filter_alt</span>
            <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
              <span className="material-symbols-rounded">search</span>
            </div>
            <div className="filter-pills">
              <button className="pill active">All</button>
              <button className="pill">Favorite</button>
              <button className="pill">Fresh Juice</button>
              <button className="pill">Milkshake</button>
              <button className="pill">Snacks</button>
            </div>
          </>
        ) : (
          <div className="search-bar">
            <span className="material-symbols-rounded search-input-icon">search</span>
            <input
              type="text"
              placeholder='Search  "Juice"'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="material-symbols-rounded close-search-icon" onClick={() => {
              setShowSearch(false);
              setSearchText('');
            }}>close</span>
          </div>
        )}
      </div>


      {/* Bell Icon */}
      <span className="material-symbols-rounded floating-bell" onClick={() => setShowBellPopup(true)}>notifications_active</span>

      {/* Bell Modal */}
      {showBellPopup && (
        <div className="bell-popup-overlay" onClick={() => setShowBellPopup(false)}>
          <div className="bell-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowBellPopup(false)}>&times;</button>
            <label>Enter your name (optional)</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
            <label>Select Table *</label>
            <div className="select-wrapper">
              <select className="table-select" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required>
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
            <button className={`call-captain-btn ${userName.trim() && tableNumber ? 'enabled' : ''}`} disabled={!userName.trim() || !tableNumber}>
              Call Captain <span className="material-symbols-rounded">notifications_active</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="filter-modal-overlay">
          <div className="filter-modal">
            <button className="popup-close" onClick={() => setShowFilterModal(false)}>✕</button>
            <h3>Filters and Sorting</h3>
            <div className="filter-section">
              <h4>Sort by</h4>
              <div className="btn-group">
                <button className={sort === 'low-high' ? 'selected' : ''} onClick={() => setSort('low-high')}>Price – low to high</button>
                <button className={sort === 'high-low' ? 'selected' : ''} onClick={() => setSort('high-low')}>Price – high to low</button>
              </div>
            </div>
            <div className="filter-section">
              <h4>Veg/Non-veg preference</h4>
              <div className="btn-group">
                <button className={`veg-btn ${preference === 'veg' ? 'selected' : ''}`} onClick={() => setPreference('veg')}>
                  <span className="material-symbols-rounded veg-icon1">square_dot</span> Veg
                </button>
                <button className={`nonveg-btn ${preference === 'nonveg' ? 'selected' : ''}`} onClick={() => setPreference('nonveg')}>
                  <span className="material-symbols-rounded nonveg-icon">kebab_dining</span> Non-Veg
                </button>
                <button className={`egg-btn ${preference === 'egg' ? 'selected' : ''}`} onClick={() => setPreference('egg')}>
                  <span className="material-symbols-rounded egg-icon">egg</span> Egg
                </button>
              </div>
            </div>
            <div className="filter-section">
              <h4>Top pick</h4>
              <button className={`highlighted ${topPick ? 'selected' : ''}`} onClick={() => setTopPick(!topPick)}>
                <span className="material-symbols-rounded top-pick-icon">replay</span> Highly reordered
              </button>
            </div>
            <div className="footer-btns">
              <button className="clear-btn" onClick={() => { setSort(''); setPreference(''); setTopPick(false); }}>Clear All</button>
              <button className={`apply-btn ${sort || preference || topPick ? 'active' : ''}`} onClick={() => setShowFilterModal(false)}>Apply (168)</button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Modal */}
      {showCustomizeModal && customizeItem && (
        <div className="customize-modal-overlay">
          <div className="customize-modal">
            <button className="modal-close-btn" onClick={handleCloseCustomize}>&times;</button>
            <div className="modal-header">
              <img src={customizeItem.img} alt={customizeItem.name} className="modal-thumb" />
              <h3 className="modal-title">{customizeItem.name}</h3>
              <img src={fav} alt="Favourite" className="modal-fav-btn" />
            </div>
            <div className="modal-body">
              <p className="section-title">Choice Of Sugar</p>
              <div className="option-row">
                {sugarOptions.map((opt, i) => (
                  <label key={i} className="option-card">
                    <input type="radio" name="sugar" checked={selectedSugar === opt.name} onChange={() => setSelectedSugar(opt.name)} />
                    <div className="option-left">
                      <div className="veg-icon" />
                      <div className="label-text">{opt.name}</div>
                    </div>
                    <div className="option-right">
                      <span className="label-price">₹{opt.price}</span>
                      <div className={`circle-radio ${selectedSugar === opt.name ? 'selected' : ''}`} />
                    </div>
                  </label>
                ))}
              </div>
              <p className="section-title">Choice Of Ice</p>
              <div className="option-row">
                {iceOptions.map((opt, i) => (
                  <label key={i} className="option-card">
                    <input type="radio" name="ice" checked={selectedIce === opt.name} onChange={() => setSelectedIce(opt.name)} />
                    <div className="option-left">
                      <div className="veg-icon" />
                      <div className="label-text">{opt.name}</div>
                    </div>
                    <div className="option-right">
                      <span className="label-price">₹{opt.price}</span>
                      <div className={`circle-radio ${selectedIce === opt.name ? 'selected' : ''}`} />
                    </div>
                  </label>
                ))}
              </div>
              <p className="section-title">Add a cooking request</p>
              <textarea placeholder="e.g. Don't make it too spicy" maxLength={100}></textarea>
            </div>
            <div className="modal-bottom-bar footer-row">
              <div className="quantity-inline">
                <button onClick={() => setModalQty(Math.max(1, modalQty - 1))}>−</button>
                <span>{modalQty}</span>
                <button onClick={() => setModalQty(modalQty + 1)}>+</button>
              </div>
              <button className="add-to-cart1" onClick={handleAddFromModal}>
                Add Item <span className="strike-price">₹{totalOldPrice}</span> <strong>₹{totalNewPrice}</strong>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu items */}
      <div className="sub-items">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
          .map((item, idx) => (
            <div className="menu-item-card" key={idx}>
              <div className="menu-item-left">
                <div className="veg-icon" />
                <h3 className="item-title">{item.name}</h3>
                <div className="price-section">
                  <span className="price-new">₹{item.price}</span>
                  <span className="price-old">₹{item.oldPrice}</span>
                </div>
                <div className="discount-line"><span>50% OFF</span></div>
                <p className="item-desc">{item.description}</p>
                <div className="wishlist-icon-group">
                  <span className="material-symbols-rounded favorite-icon">favorite</span>
                  {cartCount[item.name] > 0 && (
                    <img src={delIcon} alt="Delete" className="delete-img" onClick={() => removeItem(item)} />
                  )}
                </div>
                <hr className="dotted-line" />
              </div>
              <div className="menu-item-right">
                <img src={item.img} alt={item.name} className="item-img" />
                {item.customizable && <div className="customizable-label">customizable</div>}
                <div className="add-btn-wrapper">
                  {cartCount[item.name] > 0 ? (
                    <div className="qty-pill">
                      <button onClick={() => removeItem(item)}>−</button>
                      <span className="divider">|</span>
                      <span className="count">{cartCount[item.name]}</span>
                      <span className="divider">|</span>
                      <button onClick={() => addItem(item)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => handleAddClick(item)}>ADD</button>
                  )}
                  {item.customizable && cartCount[item.name] > 0 && (
                    <div className="customizable-label" onClick={() => handleAddClick(item)}>
                      customizable
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {totalItems > 0 && (
  <div className="cart-summary-bar">
    <div className="cart-summary-content">
      <div className="summary-top">
        <span className="item-text">{totalItems} item{totalItems > 1 ? 's' : ''} added</span>
        <span
  className="material-symbols-rounded arrow-icon"
  onClick={() => {
    const selectedCartItems = Object.entries(cartCount).map(([name, qty]) => {
      const item = items.find((i) => i.name === name);
      return {
        name: item.name,
        qty,
        price: item.price,
        oldPrice: item.oldPrice,
        img: item.img,
        customizable: item.customizable,
        description: item.description,
        customizeNote: item.customizable ? "Add Country Sugar, Without Ice" : "", // or real note
      };
    });

    navigate('/order', {
      state: {
        cartItems: selectedCartItems,
        totalAmount,
      },
    });
  }}
>
  arrow_circle_right
</span>

        {/* <span
  className="material-symbols-rounded arrow-icon"
  onClick={() => navigate('/order')}
>
  arrow_circle_right
</span> */}

      </div>

      <div className="summary-bottom">
        {roundedAmountLeft > 0
          ? `Add items worth ₹${roundedAmountLeft} more to get 50 points`
          : `🎉 You've unlocked 50 reward points!`}
      </div>
    </div>
  </div>
)}


      {/* {totalItems > 0 && (
  <div className="cart-summary-bar">
    <div className="cart-summary-content">
      <div className="summary-top">
        <span className="item-text">{totalItems} item{totalItems > 1 ? 's' : ''} added</span>
        <span className="material-symbols-rounded arrow-icon">arrow_circle_right</span>
      </div>

      <div className="summary-bottom">
  {roundedAmountLeft > 0
    ? `Add items worth ₹${roundedAmountLeft} more to get 50 points`
    : `🎉 You've unlocked 50 reward points!`}
</div>



    </div>
  </div>
)} */}

{/* {showCartModal && (
  <div className="cart-modal-overlay" onClick={() => setShowCartModal(false)}>
    <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
      <div className="cart-modal-header">
        <p>🎉 You earned ₹{Math.floor(totalAmount * 0.06)} Points on this order</p>
        <button onClick={() => setShowCartModal(false)} className="popup-close">&times;</button>
      </div>

      {Object.keys(cartCount).map((itemName) => {
        const item = items.find((i) => i.name === itemName);
        const qty = cartCount[itemName];
        return (
          <div key={itemName} className="cart-modal-item">
            <div>
              <h4>{item.name}</h4>
              <p>Add Country Sugar, Without Ice</p>
              <button>Edit &nbsp; <span className="material-symbols-rounded">arrow_forward</span></button>
            </div>
            <div className="modal-item-price">
              <div className="qty-inline">
                <button onClick={() => removeItem(item)}>−</button>
                <span>{qty}</span>
                <button onClick={() => addItem(item)}>+</button>
              </div>
              <div>
                <span className="strike">₹{item.oldPrice * qty}</span>
                <strong> ₹{item.price * qty}</strong>
              </div>
            </div>
          </div>
        );
      })}

      <div className="cart-summary-totals">
        <div><span>Subtotal</span><span>₹{totalAmount}</span></div>
        <div><span>GST (5%)</span><span>₹{Math.round(totalAmount * 0.05)}</span></div>
        <div className="total-line"><span>Total</span><span>₹{Math.round(totalAmount * 1.05)}</span></div>
      </div>

      <div className="cart-modal-actions">
        <button className="proceed-btn">Proceed to Order</button>
        <button className="back-btn" onClick={() => setShowCartModal(false)}>Back to Menu</button>
      </div>
    </div>
  </div>
)} */}



      

    </div>
  );
}
