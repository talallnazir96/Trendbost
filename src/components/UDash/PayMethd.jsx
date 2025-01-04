// PaymentMethod.js
import React, { useState, useEffect } from "react";
import { FaPaypal, FaCreditCard, FaWallet, FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import  './UDash.css'

const PayMethd = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [showNewMethods, setShowNewMethods] = useState(false);
  const [existingMethods, setExistingMethods] = useState(() => {
    return JSON.parse(localStorage.getItem("paymentMethods")) || [{ type: "card", detail: "**** **** **** 5647" }];
  });

  useEffect(() => {
    localStorage.setItem("paymentMethods", JSON.stringify(existingMethods));
  }, [existingMethods]);

  const handleAddNewMethod = () => {
    setShowNewMethods(true);
    setSelectedMethod("");
  };

  const handleRemoveMethod = (index) => {
    const newMethods = [...existingMethods];
    newMethods.splice(index, 1);
    setExistingMethods(newMethods);
  };

  const handleBack = () => {
    setShowNewMethods(false);
    setSelectedMethod("");
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setOpenSection(openSection === method ? null : method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMethod = {
      type: selectedMethod,
      detail: formData.get("detail"),
    };
    setExistingMethods([...existingMethods, newMethod]);
    setShowNewMethods(false);
    setSelectedMethod("");
  };

  return (
    <div className="udash-main-container">
      <div className="udash-container">
        <div className="udash-heading-container">
          {showNewMethods && <FaArrowLeft className="udash-back-icon" onClick={handleBack} />}
          <h2 className="udash-heading">Payment Methods</h2>
        </div>
        <div className="udash-options">
          {!showNewMethods && existingMethods.length > 0 && (
            <div className="udash-existing-methods">
              <h3 className="udash-section-heading">Your Payment Methods</h3>
              {existingMethods.map((method, index) => (
                <div key={index} className="udash-method-container udash-existing-method">
                  <div className="udash-method-header">
                    <label className="udash-option-label">
                      <input
                        type="radio"
                        name="existingMethod"
                        checked={selectedMethod === method.type}
                        onChange={() => handleMethodChange(method.type)}
                      />
                      <div
                        className={`udash-option ${selectedMethod === method.type ? "active" : ""}`}
                        onClick={() => handleMethodChange(method.type)}
                      >
                        <div className="udash-icon-label-container">
                          {method.type === "paypal" && <FaPaypal className="udash-icon" />}
                          {method.type === "card" && <FaCreditCard className="udash-icon" />}
                          {method.type === "crypto" && <FaWallet className="udash-icon" />}
                          <span className="udash-label">{method.detail}</span>
                        </div>
                      </div>
                    </label>
                    <FaTrashAlt className="udash-remove-icon" onClick={() => handleRemoveMethod(index)} />
                  </div>
                  {openSection === method.type && (
                    <div className="udash-method-details">
                      <div className="udash-details-menu">
                        <p>Details for {method.type}: {method.detail}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!showNewMethods && (
            <div className="udash-button-container">
              <button className="udash-add-method-button" onClick={handleAddNewMethod}>
                Add Payment Method
              </button>
            </div>
          )}

          {showNewMethods && (
            <form onSubmit={handleSubmit}>
              {/* PayPal Payment Option */}
              <div className="udash-method-container">
                <div
                  className={`udash-option ${selectedMethod === "paypal" ? "active" : ""}`}
                  onClick={() => handleMethodChange("paypal")}
                >
                  <div className="udash-icon-label-container">
                    <FaPaypal className="udash-icon" />
                    <span className="udash-label">PayPal</span>
                  </div>
                </div>
                <div className={`udash-details ${openSection === "paypal" ? "show" : ""}`}>
                  <div className="udash-form-row">
                    <div className="udash-form-group">
                      <label>PayPal ID</label>
                      <input type="text" name="detail" placeholder="Enter your PayPal ID" required />
                    </div>
                    <div className="udash-form-group">
                      <label>PayPal Email</label>
                      <input type="email" placeholder="Enter your PayPal email" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit/Debit Card Payment Option */}
              <div className="udash-method-container">
                <div
                  className={`udash-option ${selectedMethod === "card" ? "active" : ""}`}
                  onClick={() => handleMethodChange("card")}
                >
                  <div className="udash-icon-label-container">
                    <FaCreditCard className="udash-icon" />
                    <span className="udash-label">Credit/Debit Card</span>
                  </div>
                </div>
                <div className={`udash-details ${openSection === "card" ? "show" : ""}`}>
                  <div className="udash-form-row">
                    <div className="udash-form-group">
                      <label>Card Number</label>
                      <input type="text" name="detail" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="udash-form-group">
                      <label>Name on card</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="udash-form-row">
                    <div className="udash-form-group">
                      <label>Expiration Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="udash-form-group">
                      <label>CVV</label>
                      <input type="password" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Wallet Payment Option */}
              <div className="udash-method-container">
                <div
                  className={`udash-option ${selectedMethod === "crypto" ? "active" : ""}`}
                  onClick={() => handleMethodChange("crypto")}
                >
                  <div className="udash-icon-label-container">
                    <FaWallet className="udash-icon" />
                    <span className="udash-label">Crypto Wallet</span>
                  </div>
                </div>
                <div className={`udash-details ${openSection === "crypto" ? "show" : ""}`}>
                  <div className="udash-form-row">
                    <div className="udash-form-group">
                      <label>Wallet ID</label>
                      <input type="text" name="detail" placeholder="Enter your wallet ID" required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="udash-button-container">
                <button type="submit" className="udash-proceed-button">
                  Add Method
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayMethd;