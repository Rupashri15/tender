import React from 'react';
import './Receipt.css';
import logo from '../assets/logo.png';
import { FaInstagram, FaGlobe } from 'react-icons/fa';

const Receipt = () => {
  return (
    <div className="receipt-wrapper">
      <div className="receipt-header">
        <img src={logo} alt="Tender Town Logo" />
        <div className="receipt-title">Tender Town</div>
        <div className="receipt-address">
          114D/170, Mount Poonamallee Road,<br />
          Porur, Mugaliwakkam Chennai, 600116.<br />
          GST IN: 33BWDPV3834K1Z7<br />
          Phone : 073387 80100
        </div>
      </div>

      <hr className="dashed" />

      <div className="receipt-meta">
        <span>Bill No: <i>001</i></span>
        <span>Time : <i>12:14 PM</i></span>
        <span>Date : <i>02-02-2024</i></span>
      </div>

      <hr className="dashed" />

      <table className="receipt-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>GST</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple Juice</td>
            <td>2</td>
            <td>₹80.00</td>
            <td>2%</td>
            <td>₹164.00</td>
          </tr>
          <tr>
            <td>Orange Juice</td>
            <td>1</td>
            <td>₹40.00</td>
            <td>5%</td>
            <td>₹42.00</td>
          </tr>
          <tr>
            <td>Mango Juice</td>
            <td>1</td>
            <td>₹40.00</td>
            <td>2%</td>
            <td>₹41.00</td>
          </tr>
          <tr>
            <td>ABC Juice</td>
            <td>2</td>
            <td>₹80.00</td>
            <td>2%</td>
            <td>₹164.00</td>
          </tr>
        </tbody>
      </table>

      <div className="receipt-total">
        <strong>GRAND TOTAL : ₹411.00</strong>
      </div>

      <div className="receipt-footer">
        <p className="reward-points">Reward points : 41.00</p>
        <p className="thank-line">Thank you for choosing Tender Town !</p>
        <p className="thank-line">Visit again soon. <span className="emoji">😊</span></p>

        <div className="social">
          <span><FaInstagram /> tender_town</span>
          <span><FaGlobe /> tender-town.business.site/</span>
        </div>
      </div>
    </div>
  );
};

export default Receipt;



