// import React, { useState } from 'react';
// import { FaSearch, FaMicrophone, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// import './Menu.css';
// import Juice1 from '../assets/Juice 1.png';
// import Juice2 from '../assets/Juice 2.png';
// import Juice3 from '../assets/Juice 3.png';
// import logo from '../assets/logo.png';
// import cartIcon from '../assets/cart.png';
// import userIcon from '../assets/user.png';
// import fav from '../assets/favorite.png';
// import delIcon from '../assets/delete.png';
// import bell from '../assets/bell.png';

// const items = [
//   {
//     name: 'Oreo Milkshake',
//     description: 'Indulge in the creamy blend of Oreo and milk.',
//     price: 199,
//     oldPrice: 238,
//     img: Juice1,
//     preferences: ['Ice Cream', 'Chocolate', 'Oreo'],
//   },
//   {
//     name: 'ABC Juice',
//     description: 'Combination of Apple, Beetroot, and Carrot',
//     price: 109,
//     oldPrice: 218,
//     img: Juice2,
//     preferences: ['Apple', 'Beetroot', 'Carrot'],
//   },
//   {
//     name: 'Plain Dates Shake',
//     description: 'Indulge in the creamy blend of dates and milk.',
//     price: 199,
//     oldPrice: 238,
//     img: Juice3,
//     preferences: ['Dates', 'Milk'],
//   },
// ];

// export default function Menu() {
//   const navigate = useNavigate();
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [selected, setSelected] = useState([]);
//   const [cartCount, setCartCount] = useState({});
//   const [showCustomizeBar, setShowCustomizeBar] = useState(false);
//   const [showCustomizeModal, setShowCustomizeModal] = useState(false);
//   const [customizeItem, setCustomizeItem] = useState(null);

//   const addItem = (item) => {
//     const updatedCount = {
//       ...cartCount,
//       [item.name]: (cartCount[item.name] || 0) + 1,
//     };
//     setCartCount(updatedCount);
//     setSelected((prev) => [...prev, item]);
//     setShowCustomizeBar(true);
//   };

//   const removeItem = (item) => {
//     const currentCount = cartCount[item.name] || 0;
//     if (currentCount > 1) {
//       setCartCount((prev) => ({
//         ...prev,
//         [item.name]: currentCount - 1,
//       }));
//     } else {
//       const newCount = { ...cartCount };
//       delete newCount[item.name];
//       setCartCount(newCount);
//       setSelected((prev) => prev.filter((i) => i.name !== item.name));
//     }
//   };

//   const handleAddToCart = (newItems) => {
//     const old = JSON.parse(localStorage.getItem('cart')) || [];
//     const saved = [...old, ...newItems];
//     localStorage.setItem('cart', JSON.stringify(saved));
//     navigate('/cart');
//   };

//   const handleCustomizeClick = (item) => {
//     setCustomizeItem(item);
//     setShowCustomizeModal(true);
//   };

//   const handleCloseCustomize = () => {
//     setCustomizeItem(null);
//     setShowCustomizeModal(false);
//   };

//   return (
//     <div className="menu-page">
//       {/* Header */}
//       <div className="menu-top-bar">
//         <div className="menu-header-bar">
//           <div className="left">
//             <img src={logo} alt="logo" className="logo-img" />
//             <div className="text-group">
//               <h1 className="brand-title">Tender Town</h1>
//               <p className="brand-subtitle">The Taste of the Nature</p>
//             </div>
//           </div>
//           <div className="right-icons">
//             <img src={cartIcon} alt="Cart" className="icon-btn" />
//             <img src={userIcon} alt="User" className="icon-btn" />
//           </div>
//         </div>

//         <div className="search-wrapper">
//           {!showSearch && (
//             <div className="search-bar-toggle" onClick={() => setShowSearch(true)}>
//               <FaSearch />
//             </div>
//           )}
//           <div className="filter-pills">
//             <button className="pill active">All</button>
//             <button className="pill">Favorite</button>
//             <button className="pill">Fresh Juice</button>
//             <button className="pill">Milkshake</button>
//             <button className="pill">Snacks</button>
//           </div>
//         </div>
//       </div>

//       {showSearch && (
//         <div className="search-bar visible">
//           <input
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder='Search for "Juice"'
//           />
//           <FaTimes className="close-icon" onClick={() => setShowSearch(false)} />
//           <FaSearch className="search-icon" />
//           <FaMicrophone className="mic-icon" />
//         </div>
//       )}

//       {/* Menu Items */}
//       <div className="sub-items">
//         {items
//           .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
//           .map((item, idx) => (
//             <div className="menu-item-card" key={idx}>
//               <div className="menu-item-left">
//                 <div className="veg-icon" />
//                 <h3 className="item-title">{item.name}</h3>
//                 <div className="price-section">
//                   <span className="price-new">₹{item.price}</span>
//                   <span className="price-old">₹{item.oldPrice}</span>
//                 </div>
//                 <div className="discount-line">
//                   <span>50% OFF</span>
//                 </div>
//                 <p className="item-desc">{item.description}</p>

//                 <div className="wishlist-icon-group">
//                   <img src={fav} alt="Favorite" className="favorite-img" />
//                   {cartCount[item.name] > 0 && (
//                     <img
//                       src={delIcon}
//                       alt="Delete"
//                       className="delete-img"
//                       onClick={() => removeItem(item)}
//                     />
//                   )}
//                 </div>
//                 <hr className="dotted-line" />
//               </div>

//               <div className="menu-item-right">
//                 <img src={item.img} alt={item.name} className="item-img" />
//                 <div className="add-btn-wrapper">
//                   {cartCount[item.name] > 0 ? (
//                     <div className="qty-pill">
//                       <button onClick={() => removeItem(item)}>−</button>
//                       <span className="divider">|</span>
//                       <span className="count">{cartCount[item.name]}</span>
//                       <span className="divider">|</span>
//                       <button onClick={() => addItem(item)}>+</button>
//                     </div>
//                   ) : (
//                     <button className="add-btn" onClick={() => addItem(item)}>
//                       ADD
//                     </button>
//                   )}
//                   {cartCount[item.name] > 0 && (
//                     <div className="customizable-label" onClick={() => handleCustomizeClick(item)}>
//                       customizable
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* Floating Customize All Button */}
//       {showCustomizeBar && selected.length > 0 && (
//         <div className="customize-all-wrapper">
//           <button className="customize-all-btn" onClick={() => handleAddToCart(selected)}>
//             Customize Your Order
//           </button>
//         </div>
//       )}

//       {/* Bell */}
//       <img src={bell} alt="Bell" className="floating-bell" />

//       {/* Customization Bottom Modal */}
//       {/*  ✨  Customisation Bottom Sheet ✨ */}
// {showCustomizeModal && (
//   <div className="customize-modal-overlay">
//     <div className="customize-modal">

//       {/* close (unchanged) */}
//       <button className="modal-close-btn" onClick={handleCloseCustomize}>
//         &times;
//       </button>

//       {/* new header row — image | title | favourite */}
//       <div className="modal-header">
//         <img
//           src={customizeItem.img}
//           alt={customizeItem.name}
//           className="modal-thumb"
//         />

//         <h3 className="modal-title">{customizeItem.name}</h3>

//         <img
//           src={fav}
//           alt="Favourite"
//           className="modal-fav-btn"
//           /* …onClick={() => toggleFav(customizeItem)}   <- if you track favourites */
//         />
//       </div>

//       {/* scrollable body so header stays fixed */}
//       <div className="modal-body">

//         {/* SUGAR ******************************************************** */}
//         <p className="section-title">Choice Of Sugar</p>
//         <div className="option-row">
//           <label>
//             <input type="radio" name="sugar" />
//             <span className="label-text">Less Sugar</span>
//             <span className="label-price">$1</span>
//           </label>

//           <label>
//             <input type="radio" name="sugar" />
//             <span className="label-text">Add Honey Instead Of Sugar</span>
//             <span className="label-price">$20</span>
//           </label>

//           <label>
//             <input type="radio" name="sugar" />
//             <span className="label-text">Add Country Sugar</span>
//             <span className="label-price">$15</span>
//           </label>
//         </div>

//         {/* ICE ********************************************************** */}
//         <p className="section-title">Choice Of Ice</p>
//         <div className="option-row">
//           <label>
//             <input type="radio" name="ice" />
//             <span className="label-text">Without Ice</span>
//             <span className="label-price">$20</span>
//           </label>
//           <label>
//             <input type="radio" name="ice" />
//             <span className="label-text">Extra Ice</span>
//             <span className="label-price">$1</span>
//           </label>
//         </div>

//         {/* REQUEST ****************************************************** */}
//         <p className="section-title">Add a cooking request</p>
//         <textarea placeholder="e.g. Don't make it too spicy"></textarea>
//       </div>

//       {/* sticky footer ************************************************** */}
//       <div className="modal-bottom-bar">
//         <div className="quantity-row">
//           <button>−</button>
//           <span>1</span>
//           <button>+</button>
//         </div>

//         <button className="add-to-cart">
//           Add Item&nbsp;$239&nbsp;<strong>$199</strong>
//         </button>
//       </div>
//     </div>
//   </div>
// )}

      
//     </div>
//   );
// }


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
import bell from '../assets/bell.png';

const items = [
  {
    name: 'Oreo Milkshake',
    description: 'Indulge in the creamy blend of Oreo and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice1,
    preferences: ['Ice Cream', 'Chocolate', 'Oreo'],
  },
  {
    name: 'ABC Juice',
    description: 'Combination of Apple, Beetroot, and Carrot',
    price: 109,
    oldPrice: 218,
    img: Juice2,
    preferences: ['Apple', 'Beetroot', 'Carrot'],
  },
  {
    name: 'Plain Dates Shake',
    description: 'Indulge in the creamy blend of dates and milk.',
    price: 199,
    oldPrice: 238,
    img: Juice3,
    preferences: ['Dates', 'Milk'],
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);
  const [cartCount, setCartCount] = useState({});
  const [showCustomizeBar, setShowCustomizeBar] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [selectedSugar, setSelectedSugar] = useState('');
  const [selectedIce, setSelectedIce] = useState('');

  const addItem = (item) => {
    const updatedCount = {
      ...cartCount,
      [item.name]: (cartCount[item.name] || 0) + 1,
    };
    setCartCount(updatedCount);
    setSelected((prev) => [...prev, item]);
    setShowCustomizeBar(true);
  };

  const removeItem = (item) => {
    const currentCount = cartCount[item.name] || 0;
    if (currentCount > 1) {
      setCartCount((prev) => ({
        ...prev,
        [item.name]: currentCount - 1,
      }));
    } else {
      const newCount = { ...cartCount };
      delete newCount[item.name];
      setCartCount(newCount);
      setSelected((prev) => prev.filter((i) => i.name !== item.name));
    }
  };

  const handleAddToCart = (newItems) => {
    const old = JSON.parse(localStorage.getItem('cart')) || [];
    const saved = [...old, ...newItems];
    localStorage.setItem('cart', JSON.stringify(saved));
    navigate('/cart');
  };

  const handleCustomizeClick = (item) => {
    setCustomizeItem(item);
    setShowCustomizeModal(true);
    setModalQty(1);
    setSelectedSugar('');
    setSelectedIce('');
  };

  const handleCloseCustomize = () => {
    setCustomizeItem(null);
    setShowCustomizeModal(false);
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
    const sugar = sugarOptions.find(opt => opt.name === selectedSugar)?.price || 0;
    const ice = iceOptions.find(opt => opt.name === selectedIce)?.price || 0;
    return sugar + ice;
  };

  const totalOldPrice = (customizeItem?.oldPrice || 0) * modalQty;
  const totalNewPrice = (customizeItem?.price || 0) * modalQty + getOptionPrice();

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-top-bar">
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
            <button className="pill">Favorite</button>
            <button className="pill">Fresh Juice</button>
            <button className="pill">Milkshake</button>
            <button className="pill">Snacks</button>
          </div>
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

      {/* Menu Items */}
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
                  <img src={fav} alt="Favorite" className="favorite-img" />
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

      {/* Customize Button */}
      {showCustomizeBar && selected.length > 0 && (
        <div className="customize-all-wrapper">
          {/* <button className="customize-all-btn" onClick={() => handleAddToCart(selected)}>
            Customize Your Order
          </button> */}
        </div>
      )}

      {/* Floating Bell */}
      <img src={bell} alt="Bell" className="floating-bell" />

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
                <div className={`circle-radio ${selectedSugar === opt.name ? "selected" : ""}`} />
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
        <div className={`circle-radio ${selectedIce === opt.name ? "selected" : ""}`} />
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

   {/* {showCustomizeModal && customizeItem && (
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
        <small>Select up to 1 option</small>
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
                <div className="veg-icon"></div>
                <div className="label-text">{opt.name}</div>
              </div>
              <div className="option-right">
                <span className="label-price">₹{opt.price}</span>
                <div className="circle-radio"></div>
              </div>
            </label>
          ))}
        </div>

        <p className="section-title">Choice Of Ice</p>
        <small>Select up to 1 option</small>
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
                <div className="bar-icon" />
                <div className="label-text">{opt.name}</div>
              </div>
              <div className="option-right">
                <span className="label-price">₹{opt.price}</span>
                <div className="circle-radio"></div>
              </div>
            </label>
          ))}
        </div>

        <p className="section-title">Add a cooking request</p>
        <textarea placeholder="e.g. Don't make it too spicy" maxLength={100}></textarea>
      </div>

      <div className="modal-bottom-bar-row">
        <div className="quantity-inline">
          <button onClick={() => setModalQty(Math.max(1, modalQty - 1))}>−</button>
          <span>{modalQty}</span>
          <button onClick={() => setModalQty(modalQty + 1)}>+</button>
        </div>
        <button className="add-to-cart">
          Add Item ₹{totalOldPrice} <strong>₹{totalNewPrice}</strong>
        </button>
      </div>
    </div>
  </div>
)} */}

      {/* {showCustomizeModal && customizeItem && (
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
                  <label className="option-card">
  <input type="radio" name="sugar" />
  <div className="option-left">
    <div className="veg-icon" />
    <div className="text-group">
      <div className="label-text">Add Honey Instead Of Sugar</div>
      <div className="label-count">+1</div>
    </div>
  </div>
  <div className="option-right">
    <span className="label-price">₹20</span>
    <button className="option-add-btn">ADD</button>
  </div>
</label>

                  // <label key={i} className="option-card">
                  //   <input
                  //     type="radio"
                  //     name="sugar"
                  //     checked={selectedSugar === opt.name}
                  //     onChange={() => setSelectedSugar(opt.name)}
                  //   />
                  //   <div className="option-left">
                  //     <div className="bar-icon" />
                  //     <span className="label-text">{opt.name}</span>
                  //   </div>
                  //   <span className="label-price">₹{opt.price}</span>
                  // </label>
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
                      <div className="bar-icon" />
                      <span className="label-text">{opt.name}</span>
                    </div>
                    <span className="label-price">₹{opt.price}</span>
                  </label>
                ))}
              </div>

              <p className="section-title">Add a cooking request</p>
              <textarea placeholder="e.g. Don't make it too spicy"></textarea>
            </div>

            <div className="modal-bottom-bar">
              <div className="quantity-row">
                <button onClick={() => setModalQty(Math.max(1, modalQty - 1))}>−</button>
                <span>{modalQty}</span>
                <button onClick={() => setModalQty(modalQty + 1)}>+</button>
              </div>

              <button className="add-to-cart">
                Add Item&nbsp;₹{totalOldPrice}&nbsp;<strong>₹{totalNewPrice}</strong>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
