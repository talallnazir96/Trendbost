import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaypal, FaCreditCard, FaWallet, FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import "./PMethod.css";

const PMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [existingMethods, setExistingMethods] = useState([{ type: "card", detail: "**** **** **** 5647" }]);
  const [showNewMethods, setShowNewMethods] = useState(false);
  const navigate = useNavigate();

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setOpenSection(openSection === method ? null : method);
  };

  const handleProceed = () => {
    navigate("/checkout-page", { state: { selectedMethod } });
  };

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

  return (
    <div className="PMethod-main-container">
      <div className="payment-container">
        <div className="heading-container">
          {showNewMethods && <FaArrowLeft className="back-icon" onClick={handleBack} />}
          <h2 className="payment-heading">Payment Methods</h2>
        </div>

        <div className="payment-options">
          {!showNewMethods && existingMethods.length > 0 && (
            <div className="existing-methods">
              <h3 className="section-heading">Your Payment Methods</h3>
              {existingMethods.map((method, index) => (
                <div key={index} className="payment-method-container existing-method">
                  <div className="payment-method-header">
                    <label className="payment-option-label">
                      <input
                        type="radio"
                        name="existingMethod"
                        checked={selectedMethod === method.type}
                        onChange={() => handleMethodChange(method.type)}
                      />
                      <div
                        className={`payment-option ${selectedMethod === method.type ? "active" : ""}`}
                        onClick={() => handleMethodChange(method.type)}
                      >
                        <div className="icon-label-container">
                          {method.type === "paypal" && <FaPaypal className="payment-icon" />}
                          {method.type === "card" && <FaCreditCard className="payment-icon" />}
                          {method.type === "crypto" && <FaWallet className="payment-icon" />}
                          <span className="payment-label">{method.detail}</span>
                        </div>
                      </div>
                    </label>
                    <FaTrashAlt className="remove-icon" onClick={() => handleRemoveMethod(index)} />
                  </div>
                  {openSection === method.type && (
                    <div className="payment-method-details">
                      <div className="payment-details-menu">
                        <p>Details for {method.type}: {method.detail}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="PMethod-button-container">
                <button className="PMethod-proceed-button" onClick={handleProceed}>
                  Proceed
                </button>
              </div>
            </div>
          )}

          {!showNewMethods && (
            <div className="PMethod-button-container">
              <button className="PMethod-add-method-button" onClick={handleAddNewMethod}>
                Add Payment Method
              </button>
            </div>
          )}

          {showNewMethods && (
            <>
              {/* PayPal Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${selectedMethod === "paypal" ? "active" : ""}`}
                  onClick={() => handleMethodChange("paypal")}
                >
                  <div className="icon-label-container">
                    <FaPaypal className="payment-icon" />
                    <span className="payment-label">PayPal</span>
                  </div>
                </div>
                <div className={`payment-details ${openSection === "paypal" ? "show" : ""}`}>
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>PayPal ID</label>
                      <input type="text" placeholder="Enter your PayPal ID" />
                    </div>
                    <div className="payment-form-group">
                      <label>PayPal Email</label>
                      <input type="email" placeholder="Enter your PayPal email" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit/Debit Card Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${selectedMethod === "card" ? "active" : ""}`}
                  onClick={() => handleMethodChange("card")}
                >
                  <div className="icon-label-container">
                    <FaCreditCard className="payment-icon" />
                    <span className="payment-label">Credit/Debit Card</span>
                  </div>
                </div>
                <div className={`payment-details ${openSection === "card" ? "show" : ""}`}>
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="payment-form-group">
                      <label>Name on card</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Expiration Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="payment-form-group">
                      <label>CVV</label>
                      <input type="password" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Wallet Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${selectedMethod === "crypto" ? "active" : ""}`}
                  onClick={() => handleMethodChange("crypto")}
                >
                  <div className="icon-label-container">
                    <FaWallet className="payment-icon" />
                    <span className="payment-label">Crypto Wallet</span>
                  </div>
                </div>
                <div className={`payment-details ${openSection === "crypto" ? "show" : ""}`}>
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Wallet ID</label>
                      <input type="text" placeholder="Enter your wallet ID" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {showNewMethods && (
          <div className="PMethod-button-container">
            <button className="PMethod-proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PMethod;