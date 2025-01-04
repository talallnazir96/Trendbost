import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SubPlans.css";

const SubPlans = () => {
  const location = useLocation();
  const platform = location.state?.platform;
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      monthlyPrice: "£7",
      yearlyPrice: "£70",
      time: "user/month",
      features: [
        "Attendance Management",
        "Leave System Management",
        "Employee Management",
        "Payroll Management",
        "Performance Tracking",
        "Basic Analytics",
      ],
    },
    {
      name: "Advance",
      monthlyPrice: "£9",
      yearlyPrice: "£90",
      time: "user/month",
      features: [
        "App Management",
        "Attendance Management",
        "Leave System Management",
        "Employee Management",
        "Expense Tracking",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      monthlyPrice: "£12",
      yearlyPrice: "£120",
      time: "user/month",
      features: [
        "App Management",
        "Attendance Management",
        "Leave System Management",
        "Employee Management",
        "Expense Tracking",
        "Chat Support",
      ],
    },
  ];

  const handleToggle = (type) => {
    setIsYearly(type === "yearly");
  };

  const handleSelectPlan = (index) => {
    setSelectedPlan(index === selectedPlan ? null : index); 
  };

  return (
    <div className="plans-container">
      <h1>Choose Your Plan</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${!isYearly ? "active" : ""}`}
          onClick={() => handleToggle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`toggle-btn ${isYearly ? "active" : ""}`}
          onClick={() => handleToggle("yearly")}
        >
          Yearly
        </button>
      </div>

      <h2>Best Plans For {platform} Subscription</h2>

      <div className="plans">
        {plans.map((plan, index) => (
          <div
            className={`plan-card ${selectedPlan === index ? "selected" : ""}`}
            key={index}
            onClick={() => handleSelectPlan(index)}
          >
            <div className="plan-content">
              <h3>{plan.name}</h3>
              <p className="price">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</p>
              <p className="time">{isYearly ? "user/year" : "user/month"}</p>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              
              <a href="#" className="try-free-link">
                Try Free 10 Likes
              </a>
              <div className="button-container">
                <button className="choose-plan" onClick={() => navigate("/payment")}>Choose Plan</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="customized-plan"
        onClick={() => navigate("/customized-plan", { state: { platform } })}
      >
        Customized Plan
      </button>
    </div>
  );
};

export default SubPlans;