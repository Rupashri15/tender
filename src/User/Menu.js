import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaTimes } from 'react-icons/fa';
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
  },
  {
    name: 'ABC Juice',
    description: 'Combination of Apple, Beetroot, and Carrot',
    price: 109,
    oldPrice: 218,
    img: Juice2,
  },
  {
    name: 'Plain Dates Shake',
    description: 'Indulge in the creamy blend of dates and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice3,
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
  const [showBellPopup, setShowBellPopup] = useState(false);
  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const [sort, setSort] = useState('');
const [preference, setPreference] = useState('');
const [topPick, setTopPick] = useState(false);


  const addItem = (item) => {
    const updated = {
      ...cartCount,
      [item.name]: (cartCount[item.name] || 0) + 1,
    };
    setCartCount(updated);
  };

  const removeItem = (item) => {
    const current = cartCount[item.name] || 0;
    if (current > 1) {
      setCartCount((prev) => ({ ...prev, [item.name]: current - 1 }));
    } else {
      const updated = { ...cartCount };
      delete updated[item.name];
      setCartCount(updated);
    }
  };

  const handleCustomizeClick = (item) => {
    setCustomizeItem(item);
    setShowCustomizeModal(true);
    setModalQty(1);
    setSelectedSugar('');
    setSelectedIce('');
  };

  const handleCloseCustomize = () => {
    setShowCustomizeModal(false);
    setCustomizeItem(null);
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

  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-top-bar">
  {/* Header with logo and icons */}
  <div className="menu-header-bar">
    <div className="left">
      <img src={logo} alt="logo" className="logo-img" />
      <div className="text-group">
        <h1 className="brand-title">Tender Town</h1>
        <p className="brand-subtitle">The Taste of the Nature</p>
      </div>
    </div>
    <div className="right-icons">
      <button className="status-btn">Online <span className="material-symbols-rounded">chevron_right</span></button>
      <img src={cartIcon} alt="Cart" className="icon-btn" />
      <img src={userIcon} alt="User" className="icon-btn" />
    </div>
  </div>

  {/* Filter/Search section */}
  <div className="search-wrapper">
    {!showSearch && (
      <>
        <span className="material-symbols-rounded filter-icon" onClick={() => setShowFilterModal(true)}>
          filter_alt
        </span>
        <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
          <span className="material-symbols-rounded">search</span>
        </div>
      </>
    )}

    {showSearch && (
      <div className="search-bar">
  <span className="material-symbols-rounded search-input-icon">search</span>
  <input type="text" placeholder='Search  "Juice"' />
  <span className="material-symbols-rounded close-search-icon">close</span>
</div>

    )}

    {!showSearch && (
      <div className="filter-pills">
        <button className="pill active">All</button>
        <button className="pill">Favorite</button>
        <button className="pill">Fresh Juice</button>
        <button className="pill">Milkshake</button>
        <button className="pill">Snacks</button>
      </div>
    )}
  </div>
</div>

      {/* <div className="menu-top-bar">
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
    <>
      <span
        className="material-symbols-rounded filter-icon"
        onClick={() => setShowFilterModal(true)}
      >
        filter_alt
      </span>

      <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
        <FaSearch />
      </div>
    </>
  )}

  {showSearch && (
    <div className="search-bar visible">
  <span className="material-symbols-rounded search-input-icon">search</span>
  <input type="text" placeholder='Search  "Juice"' />
  <span className="material-symbols-rounded close-search-icon" onClick={() => setShowSearch(false)}>close</span>
</div>


  )}


  {!showSearch && (
    <div className="filter-pills">
      <button className="pill active">All</button>
      <button className="pill">Favorite</button>
      <button className="pill">Fresh Juice</button>
      <button className="pill">Milkshake</button>
      <button className="pill">Snacks</button>
    </div>
  )}
</div>




       
        
      </div> */}

      {/* <div className="search-wrapper">
          {!showSearch && (
            <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
              <FaSearch />
            </div>
          )}
          <div className="filter-pills">
            <button className="pill active">All</button>
            <button className="pill">Favorite</button>
            <button className="pill">Fresh Juice</button>
            <button className="pill">Milkshake</button>
            <button className="pill">Snacks</button>
          </div>
        </div> */}

      {showFilterModal && (
  <div className="filter-modal-overlay">
    <div className="filter-modal">
      {/* Floating black close button */}
      <button className="popup-close" onClick={() => setShowFilterModal(false)}>
        ✕
      </button>

      <h3>Filters and Sorting</h3>

      {/* State logic */}
      {/* Make sure these states are declared in your component:
          const [sort, setSort] = useState('');
          const [preference, setPreference] = useState('');
          const [topPick, setTopPick] = useState(false);
      */}
      <div className="filter-section">
        <h4>Sort by</h4>
        <div className="btn-group">
          <button
            className={sort === 'low-high' ? 'selected' : ''}
            onClick={() => setSort('low-high')}
          >
            Price – low to high
          </button>
          <button
            className={sort === 'high-low' ? 'selected' : ''}
            onClick={() => setSort('high-low')}
          >
            Price – high to low
          </button>
        </div>
      </div>

      <div className="filter-section">
        <h4>Veg/Non-veg preference</h4>
        <div className="btn-group">
          <button
            className={`veg-btn ${preference === 'veg' ? 'selected' : ''}`}
            onClick={() => setPreference('veg')}
          >
            <span className="material-symbols-rounded veg-icon1">square_dot</span>
            Veg
          </button>

          <button
            className={`nonveg-btn ${preference === 'nonveg' ? 'selected' : ''}`}
            onClick={() => setPreference('nonveg')}
          >
            <span className="material-symbols-rounded nonveg-icon">kebab_dining</span>
            Non-Veg
          </button>

          <button
            className={`egg-btn ${preference === 'egg' ? 'selected' : ''}`}
            onClick={() => setPreference('egg')}
          >
            <span className="material-symbols-rounded egg-icon">egg</span>
            Egg
          </button>
        </div>
      </div>

      <div className="filter-section">
        <h4>Top pick</h4>
        <button
          className={`highlighted ${topPick ? 'selected' : ''}`}
          onClick={() => setTopPick(!topPick)}
        >
          <span className="material-symbols-rounded top-pick-icon">replay</span>
          Highly reordered
        </button>
      </div>

      <div className="footer-btns">
        <button
          className="clear-btn"
          onClick={() => {
            setSort('');
            setPreference('');
            setTopPick(false);
          }}
        >
          Clear All
        </button>

        <button
          className={`apply-btn ${sort || preference || topPick ? 'active' : ''}`}
          onClick={() => {
            // Call your apply filter logic here if needed
            setShowFilterModal(false);
          }}
        >
          Apply (168)
        </button>
      </div>
    </div>
  </div>
)}


      {/* {showFilterModal && (
  <div className="filter-modal-overlay">
    <div className="filter-modal">
      <button className="close-btn" onClick={() => setShowFilterModal(false)}>
        ✕
      </button>
      <h3>Filters and Sorting</h3>

      <div className="filter-section">
        <h4>Sort by</h4>
        <div className="btn-group">
          <button>Price – low to high</button>
          <button>Price – high to low</button>
        </div>
      </div>

      <div className="filter-section">
        <h4>Veg/Non-veg preference</h4>
        <div className="btn-group">
  <button className="veg-btn">
    <span className="material-symbols-rounded veg-icon1">square_dot</span>
    Veg
  </button>

  <button className="nonveg-btn">
    <span className="material-symbols-rounded nonveg-icon">kebab_dining</span>
    Non-Veg
  </button>

  <button className="egg-btn">
    <span className="material-symbols-rounded egg-icon">egg</span>
    Egg
  </button>
</div>

      </div>

      <div className="filter-section">
  <h4>Top pick</h4>
  <button className="highlighted">
    <span className="material-symbols-rounded top-pick-icon">replay</span>
    Highly reordered
  </button>
</div>



      <div className="footer-btns">
        <button className="clear-btn">Clear All</button>
        <button className="apply-btn">Apply (168)</button>
      </div>
    </div>
  </div>
)} */}


      {/* {showSearch && (
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
      )} */}

      {/* Items */}
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
                <div className="discount-line">
                  <span>50% OFF</span>
                </div>
                <p className="item-desc">{item.description}</p>
                <div className="wishlist-icon-group">
                  <span className="material-symbols-rounded favorite-icon">
  favorite
</span>

                  {/* <img src={fav} alt="Favorite" className="favorite-img" /> */}
                  {cartCount[item.name] > 0 && (
                    <img
                      src={delIcon}
                      alt="Delete"
                      className="delete-img"
                      onClick={() => removeItem(item)}
                    />
                  )}
                </div>
                <hr className="dotted-line" />
              </div>

              <div className="menu-item-right">
                <img src={item.img} alt={item.name} className="item-img" />
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
                    <button className="add-btn" onClick={() => addItem(item)}>
                      ADD
                    </button>
                  )}
                  {cartCount[item.name] > 0 && (
                    <div className="customizable-label" onClick={() => handleCustomizeClick(item)}>
                      customizable
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Bell Icon */}
      <span
        className="material-symbols-rounded floating-bell"
        onClick={() => setShowBellPopup(true)}
      >
        notifications_active
      </span>

      {/* Bell Popup */}
      {showBellPopup && (
  <div
    className="bell-popup-overlay"
    onClick={() => setShowBellPopup(false)}
  >
    <div
      className="bell-popup"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button centered above modal */}
      <button
        className="popup-close"
        onClick={() => setShowBellPopup(false)}
      >
        &times;
      </button>

      {/* Popup form fields */}
      <label>Enter your name (optional)</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Name"
      />

      {/* Table selector with custom arrow icon */}
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
    <option value="standing">standing</option>
  </select>

  {/* arrow icon */}
  <span className="material-symbols-rounded select-arrow">
    arrow_drop_down
  </span>
</div>


      {/* <label>Select Table *</label>
      <select
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        required
      >
        <option value="">--select--</option>
        <option value="1">Table 1</option>
        <option value="2">Table 2</option>
        <option value="3">Table 3</option>
        <option value="4">Table 4</option>
        <option value="5">Table 5</option>
      </select> */}

<button
  className={`call-captain-btn ${userName.trim() && tableNumber ? 'enabled' : ''}`}
  disabled={!userName.trim() || !tableNumber}
>
  Call Captain <span className="material-symbols-rounded">notifications_active</span>
</button>

      {/* <button className="call-captain-btn">
        Call Captain <span className="material-symbols-rounded">notifications_active</span>
      </button> */}
    </div>
  </div>
)}


      {/* {showBellPopup && (
        <div className="bell-popup-overlay">
          <div className="bell-popup">
            <button className="popup-close" onClick={() => setShowBellPopup(false)}>
              &times;
            </button>
            <label>Enter your name (optional)</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            <label>Select Table *</label>
            <select
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
            >
              <option value="1">Table 1</option>
              <option value="2">Table 2</option>
              <option value="3">Table 3</option>
            </select>
            <button className="call-captain-btn">
              Call Captain <span className="material-symbols-rounded">notifications_active</span>
            </button>
          </div>
        </div>
      )} */}

      {/* Customize Modal */}
      {showCustomizeModal && customizeItem && (
        <div className="customize-modal-overlay">
          <div className="customize-modal">
            <button className="modal-close-btn" onClick={handleCloseCustomize}>
              &times;
            </button>

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
                    <input
                      type="radio"
                      name="sugar"
                      checked={selectedSugar === opt.name}
                      onChange={() => setSelectedSugar(opt.name)}
                    />
                    <div className="option-left">
                      <div className="veg-icon" />
                      <div className="label-text">{opt.name}</div>
                    </div>
                    <div className="option-right">
                      <span className="label-price">₹{opt.price}</span>
                      <div
                        className={`circle-radio ${
                          selectedSugar === opt.name ? 'selected' : ''
                        }`}
                      />
                    </div>
                  </label>
                ))}
              </div>

              <p className="section-title">Choice Of Ice</p>
              <div className="option-row">
                {iceOptions.map((opt, i) => (
                  <label key={i} className="option-card">
                    <input
                      type="radio"
                      name="ice"
                      checked={selectedIce === opt.name}
                      onChange={() => setSelectedIce(opt.name)}
                    />
                    <div className="option-left">
                      <div className="veg-icon" />
                      <div className="label-text">{opt.name}</div>
                    </div>
                    <div className="option-right">
                      <span className="label-price">₹{opt.price}</span>
                      <div
                        className={`circle-radio ${
                          selectedIce === opt.name ? 'selected' : ''
                        }`}
                      />
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

              <button className="add-to-cart1">
                Add Item ₹{totalOldPrice}&nbsp;<strong>₹{totalNewPrice}</strong>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
