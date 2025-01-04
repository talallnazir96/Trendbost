import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyPlatformPackage = ({  }) => {
  const navigate = useNavigate();

  // State variables
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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



  return (
   <></>
  );
};

export default BuyPlatformPackage;