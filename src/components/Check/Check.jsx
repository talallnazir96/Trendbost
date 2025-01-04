import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPaypal, FaCreditCard, FaWallet } from "react-icons/fa";
import './Check.css';

const Check = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [storedMethods, setStoredMethods] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Simulate fetching previously added payment methods from an API or localStorage
        const dummyMethods = {
            paypal: {
                id: "user_paypal_id",
                email: "user_paypal@example.com"
            },
            card: {
                number: "1234 5678 9012 3456",
                name: "John Doe",
                expiry: "12/24",
                cvv: "123"
            },
            crypto: {
                id: "user_crypto_wallet_id"
            }
        };

        setStoredMethods(dummyMethods);

        // Set selected method from the location state or default to 'paypal'
        const selectedPaymentMethod = location.state?.selectedMethod || 'paypal';
        setSelectedMethod(selectedPaymentMethod);
    }, [location.state]);

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
    };

    const handleProceed = () => {
        navigate("/pop-up");
    };

    const userInfo = {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        postLink: 'https://example.com/post-link'
    };

    // Dummy data for packages
    const packagesData = {
        TikTok: {
            Basic: { likes: 100, comments: 100, followers: 100, price: 1000 },
            Advanced: { likes: 150, comments: 150, followers: 150, price: 2000 },
            Premium: { likes: 200, comments: 200, followers: 200, price: 3000 },
        },
        Facebook: {
            Basic: { likes: 100, comments: 100, followers: 100, price: 1500 },
            Advanced: { likes: 150, comments: 150, followers: 150, price: 2500 },
            Premium: { likes: 200, comments: 200, followers: 200, price: 3500 },
        },
        Instagram: {
            Basic: { likes: 100, comments: 100, followers: 100, price: 2000 },
            Advanced: { likes: 150, comments: 150, followers: 150, price: 3000 },
            Premium: { likes: 200, comments: 200, followers: 200, price: 4000 },
        },
        Twitter: {
            Basic: { likes: 100, comments: 100, followers: 100, price: 1200 },
            Advanced: { likes: 150, comments: 150, followers: 150, price: 2200 },
            Premium: { likes: 200, comments: 200, followers: 200, price: 3200 },
        },
    };

    const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
    const [selectedPackage, setSelectedPackage] = useState('Advanced');

    const selectedPackageDetail = packagesData[selectedPlatform][selectedPackage];

    return (
        <div className="check-unique-container">
            <div className="unique-column-1">
                <h2 className="unique-check-payment-heading">Info Detail</h2>
                <form className="unique-info-form">
                    <div className="unique-form-row">
                        <input className="unique-form-row-name" type="text" value={userInfo.firstName} readOnly />
                        <input className="unique-form-row-name" type="text" value={userInfo.lastName} readOnly />
                    </div>
                    <div className="unique-form-row">
                        <input type="email" value={userInfo.email} readOnly />
                    </div>
                </form>

                <br />
                <div className="unique-check-payment-container">
                    <h2 className="unique-check-payment-heading">Payment Methods</h2>

                    <div className="unique-check-payment-options">
                        {selectedMethod === "paypal" && (
                            <div className="unique-check-payment-method-container">
                                <div
                                    className={`unique-check-payment-option ${selectedMethod === "paypal" ? "active" : ""}`}
                                    onClick={() => handleMethodChange("paypal")}
                                >
                                    <div className="unique-check-icon-label-container">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={selectedMethod === "paypal"}
                                            onChange={() => handleMethodChange("paypal")}
                                        />
                                        <FaPaypal className="unique-check-payment-icon" />
                                        <span className="unique-check-payment-label">PayPal</span>
                                        <span className="green-tick">✓</span>
                                    </div>
                                </div>
                                <div className={`unique-check-payment-details`}>
                                    <div className="unique-check-form-row">
                                        <div className="unique-check-form-group">
                                            <label>PayPal ID</label>
                                            <input type="text" value={storedMethods.paypal?.id || ""} disabled />
                                        </div>
                                        <div className="unique-check-form-group">
                                            <label>PayPal Email</label>
                                            <input type="email" value={storedMethods.paypal?.email || ""} disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedMethod === "card" && (
                            <div className="unique-check-payment-method-container">
                                <div
                                    className={`unique-check-payment-option ${selectedMethod === "card" ? "active" : ""}`}
                                    onClick={() => handleMethodChange("card")}
                                >
                                    <div className="unique-check-icon-label-container">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={selectedMethod === "card"}
                                            onChange={() => handleMethodChange("card")}
                                        />
                                        <FaCreditCard className="unique-check-payment-icon" />
                                        <span className="unique-check-payment-label">Credit/Debit Card</span>
                                        <span className="green-tick">✓</span>
                                    </div>
                                </div>
                                <div className={`unique-check-payment-details show`}>
                                    <div className="unique-check-form-row">
                                        <div className="unique-check-form-group">
                                            <label>Card Number</label>
                                            <input type="text" value={storedMethods.card?.number || ""} disabled />
                                        </div>
                                        <div className="unique-check-form-group">
                                            <label>Name on card</label>
                                            <input type="text" value={storedMethods.card?.name || ""} disabled />
                                        </div>
                                    </div>
                                    <div className="unique-check-form-row">
                                        <div className="unique-check-form-group">
                                            <label>Expiration Date</label>
                                            <input type="text" value={storedMethods.card?.expiry || ""} disabled />
                                        </div>
                                        <div className="unique-check-form-group">
                                            <label>CVV</label>
                                            <input type="password" value={storedMethods.card?.cvv || ""} disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedMethod === "crypto" && (
                            <div className="unique-check-payment-method-container">
                                <div
                                    className={`unique-check-payment-option ${selectedMethod === "crypto" ? "active" : ""}`}
                                    onClick={() => handleMethodChange("crypto")}
                                >
                                    <div className="unique-check-icon-label-container">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={selectedMethod === "crypto"}
                                            onChange={() => handleMethodChange("crypto")}
                                        />
                                        <FaWallet className="unique-check-payment-icon" />
                                        <span className="unique-check-payment-label">Crypto Wallet</span>
                                        <span className="green-tick">✓</span>
                                    </div>
                                </div>
                                <div className={`unique-check-payment-details show`}>
                                    <div className="unique-check-form-row">
                                        <div className="unique-check-form-group">
                                            <label>Wallet ID</label>
                                            <input type="text" value={storedMethods.crypto?.id || ""} disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button className="unique-pay-now" onClick={handleProceed}><span className="btn-text">Pay Now</span></button>
            </div>

            <div className="unique-column-2">
                <h2 className="unique-check-payment-heading">Package Details</h2>
                <div className="unique-package-detail">
                    <div className="unique-package-row">
                        <p className="unique-package-name">{selectedPlatform} ({selectedPackageDetail.likes} 👍, {selectedPackageDetail.comments} 💬, {selectedPackageDetail.followers} ❤️)</p>
                        <p className="unique-package-price">{selectedPackageDetail.price} Rs</p>
                    </div>
                    <div className="unique-package-row">
                        <p className="unique-package-name">{selectedPackage} (Monthly)</p>
                    </div>
                    <div className="unique-package-row">
                        <p className="unique-package-name"><strong>Price:</strong></p>
                        <p className="unique-package-price">{selectedPackageDetail.price} Rs</p>
                    </div>
                </div>

                <div className="unique-package-summary">
                    <div className="unique-package-row">
                        <p className="unique-package-name"><strong>Subtotal:</strong></p>
                        <p className="unique-package-price">{selectedPackageDetail.price} Rs</p>
                    </div>
                    <hr />
                    <div className="unique-package-row">
                        <p className="unique-package-name"><strong>Total:</strong></p>
                        <p className="unique-package-price"><strong style={{ color: "black" }}>{selectedPackageDetail.price} Rs</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Check;