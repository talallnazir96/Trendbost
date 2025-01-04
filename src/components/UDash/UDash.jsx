import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UDash.css';
import pic from './pic.jpg';
import Divider from './Vector 131.png';
import { IoNotifications } from 'react-icons/io5';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoIosPrint } from 'react-icons/io';
import { MdPayment } from 'react-icons/md';
import { MdOutlineHistory } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';
import { BiPurchaseTag } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import DashboardGraphs from './DashboardGraphs';
import PayMethd from './PayMethd';
import { useAuth } from '../../context/auth';
import { MdOutlineLiveTv } from 'react-icons/md';
import { Toaster, toast } from 'react-hot-toast';

const UDash = ({ platform }) => {
  const [auth, setAuth] = useAuth();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [firstName, setFirstName] = useState('Ahsan');
  const [lastName, setLastName] = useState('Ehsan');
  const [email, setEmail] = useState('ahsanehsan105@example.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(pic);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    setDropdownOpen(false);
  };

  const handleToggle = (type) => {
    setIsYearly(type === 'yearly');
  };

  const handleSelectPlan = (index) => {
    setSelectedPlan(index === selectedPlan ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your profile has been updated successfully!');
  };

  const handleLogout = () => {
    setAuth({ user: null, token: '', refreshToken: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const navigateToCustomizedPlan = (platform) => {
    if (platform) {
      navigate('/customized-plan', { state: { platform } });
    } else {
      alert('Platform name is missing!');
    }
  };

  const orders = [
    { orderId: 'ORD12345', platform: 'TikTok', url: 'https://example.com/post1', status: 'Pending' },
    { orderId: 'ORD12346', platform: 'Facebook', url: 'https://example.com/post2', status: 'Processing' },
    { orderId: 'ORD12347', platform: 'Twitter', url: 'https://example.com/post3', status: 'Progress' },
    { orderId: 'ORD12348', platform: 'Instagram', url: 'https://example.com/post4', status: 'Cancelled' },
  ];

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: '£7',
      yearlyPrice: '£70',
      time: 'user/month',
      features: ['Attendance Management', 'Performance Tracking', 'Basic Analytics'],
    },
    {
      name: 'Advance',
      monthlyPrice: '£9',
      yearlyPrice: '£90',
      time: 'user/month',
      features: ['App Management', 'Expense Tracking', 'Priority Support'],
    },
    {
      name: 'Premium',
      monthlyPrice: '£12',
      yearlyPrice: '£120',
      time: 'user/month',
      features: ['App Management', 'Expense Tracking', 'Chat Support'],
    },
  ];

  const renderPlansContent = (platform) => (
    <div className='udash-plans-container'>
      <h1>Choose Your Plan</h1>
      <div className='udash-toggle-buttons'>
        <button className={`udash-toggle-btn ${!isYearly ? 'active' : ''}`} onClick={() => handleToggle('monthly')}>
          Monthly
        </button>
        <button className={`udash-toggle-btn ${isYearly ? 'active' : ''}`} onClick={() => handleToggle('yearly')}>
          Yearly
        </button>
      </div>
      <h2>Best Plans For {platform || 'Your Platform'} Subscription</h2>
      <div className='udash-plans'>
        {plans.map((plan, index) => (
          <div className={`udash-plan-card ${selectedPlan === index ? 'selected' : ''}`} key={index} onClick={() => handleSelectPlan(index)}>
            <div className='udash-plan-content'>
              <h3>{plan.name}</h3>
              <p className='udash-price'>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</p>
              <p className='udash-time'>{isYearly ? 'user/year' : 'user/month'}</p>
              <ul className='udash-features-list'>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a href='#' className='udash-try-free-link'>
                Try Free 10 Likes
              </a>
              <div className='udash-button-container'>
                <button className='udash-choose-plan' onClick={(e) => {
                  e.stopPropagation();
                  navigate('/payment');
                }}>
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='udash-customized-plan' onClick={() => navigateToCustomizedPlan(platform)}>
        Customized Plan
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <DashboardGraphs />;
      case 'Orders':
        return (
          <div className='order-table'>
            <h3 className='order-head'>Order Details</h3>
            <table className='order-details-table'>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Platform</th>
                  <th>URL</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.platform}</td>
                    <td><a href={order.url}>Link</a></td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Buy':
        return <div>Buy Content</div>;
      case 'TikTok':
        return renderPlansContent('TikTok');
      case 'Tiktok Live':
        return renderPlansContent('Tiktok Live');
      case 'Facebook':
        return renderPlansContent('Facebook');
      case 'Instagram':
        return renderPlansContent('Instagram');
      case 'Twitter':
        return renderPlansContent('Twitter');
      case 'Payment Method':
        return <PayMethd />;
      case 'Purchase History':
        return (
          <div className='purch-history-container'>
            <h3 className='purch-history-heading'>Purchase History</h3>
            <div className='scrollable-table-container'>
              <table className='history-table'>
                <thead>
                  <tr>
                    <th>Package Name</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows with provided data */}
                  <tr>
                    <td>#Basic</td>
                    <td>2023-01-01</td>
                    <td>2023-12-31</td>
                    <td>$100</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>#Advance</td>
                    <td>2023-02-01</td>
                    <td>2023-11-30</td>
                    <td>$200</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>#Basic</td>
                    <td>2023-03-01</td>
                    <td>2023-09-30</td>
                    <td>$120</td>
                    <td>Inactive</td>
                  </tr>
                  <tr>
                    <td>#Premium</td>
                    <td>2023-05-01</td>
                    <td>2023-12-31</td>
                    <td>$350</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>#Advance</td>
                    <td>2023-07-01</td>
                    <td>2023-10-31</td>
                    <td>$220</td>
                    <td>Inactive</td>
                  </tr>
                  <tr>
                    <td>#Basic</td>
                    <td>2023-08-01</td>
                    <td>2023-12-31</td>
                    <td>$150</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>#Premium</td>
                    <td>2023-09-01</td>
                    <td>2024-01-31</td>
                    <td>$400</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='pagination-container'>
              <div className='who-per-page'>Who per page: 5</div>
              <div className='pagination-buttons'>
                <button className='pagination-btn'>1</button>
                <button className='pagination-btn'>2</button>
                <button className='pagination-btn'>3</button>
                <button className='pagination-btn'>4</button>
              </div>
            </div>
          </div>
        );
      case 'Edit Profile':
        return (
          <div className='main-container'>
            <div className='prof-container'>
              <h2 className='prof-heading'>Profile Settings</h2>
              <form onSubmit={handleSubmit} className='prof-form'>
                <div className='prof-form-row'>
                  <div className='prof-form-group half-width'>
                    <input
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder='First Name'
                    />
                  </div>
                  <div className='prof-form-group half-width'>
                    <input
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder='Last Name'
                    />
                  </div>
                </div>
                <div className='prof-form-row'>
                  <div className='prof-form-group'>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled
                      placeholder='Email'
                    />
                  </div>
                  <div className='prof-form-group'>
                    <input
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Phone'
                    />
                  </div>
                </div>
                <div className='prof-form-row'>
                  <div className='prof-form-group'>
                    <input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='New Password'
                    />
                  </div>
                  <div className='prof-form-group'>
                    <input
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>
                <div className='prof-form-row prof-form-group'>
                  <input
                    type='file'
                    id='profilePic'
                    onChange={handleProfilePicChange}
                    placeholder='Profile Picture'
                    style={{ marginLeft: '10px' }} // Add some margin to space the input
                  />
                </div>
                <div className='dash-button-container'>
                  <button type='submit' className='dash-update-button'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className='main-dashboard-container'>
      <div className='dashboard-container'>
        <div className='sidebar'>
          <div>
            <div className='user-info'>
              <img src={profilePic} alt='User' className='user-avatar' />
              <div className='user-details'>
                <h5>{`${firstName} ${lastName}`}</h5>
                <p>Dashboard</p>
              </div>
            </div>
            <div>
              <img src={Divider} alt='' className='dash-divider' />
            </div>
            <ul className='menu'>
              <p style={{ paddingLeft: '13px' }}>Quick Access</p>
              <li
                className={activeMenu === 'Dashboard' ? 'active' : ''}
                onClick={() => setActiveMenu('Dashboard')}
              >
                <AiOutlineDashboard className='dash-icons' />
                Dashboard
              </li>
              <li
                className={activeMenu === 'Orders' ? 'active' : ''}
                onClick={() => setActiveMenu('Orders')}
              >
                <IoIosPrint className='dash-icons' />
                Orders
              </li>
              <li
                className={`menu-button ${['TikTok', 'Facebook', 'Instagram', 'Twitter'].includes(activeMenu) ? 'active' : ''}`}
              >
                <div className='dropdown-custom'>
                  <BiPurchaseTag className='dash-icons' />
                  <span className='buy-drop'>Buy</span>
                  <span className='dash-arrow-icon'>
                    <IoIosArrowDown className='dash-icons' />
                  </span>
                </div>
                <ul className='custom-dropdown-menu'>
                  <li onClick={() => handleMenuClick('TikTok')}><AiFillTikTok className='drop-icon' />TikTok</li>
                  <li onClick={() => handleMenuClick('Tiktok Live')}><MdOutlineLiveTv className='drop-icon' />TikTok Live</li>
                  <li onClick={() => handleMenuClick('Facebook')}><FaFacebook className='drop-icon' />Facebook</li>
                  <li onClick={() => handleMenuClick('Instagram')}><AiOutlineInstagram className='drop-icon' />Instagram</li>
                  <li onClick={() => handleMenuClick('Twitter')}><FaTwitterSquare className='drop-icon' />Twitter</li>
                </ul>
              </li>
              <li
                className={activeMenu === 'Payment Method' ? 'active' : ''}
                onClick={() => setActiveMenu('Payment Method')}
              >
                <MdPayment className='dash-icons' />
                Payment Method
              </li>
              <li
                className={activeMenu === 'Purchase History' ? 'active' : ''}
                onClick={() => setActiveMenu('Purchase History')}
              >
                <MdOutlineHistory className='dash-icons' />
                Purchase History
              </li>
              <li
                className={activeMenu === 'Edit Profile' ? 'active' : ''}
                onClick={() => setActiveMenu('Edit Profile')}
              >
                <CgProfile className='dash-icons' />
                Edit Profile
              </li>
            </ul>
          </div>
          <li className='logout-button' onClick={handleLogout}>
            <IoLogOutOutline className='dash-icons' />
            Logout
          </li>
        </div>
        <div className='main-content'>
          <header className='header'>
            <h5 className='header-content'>
              The Secret Weapon for Social Growth is Trendbost
            </h5>
            <div className='notifications'>
              <span className='notification-icon'>
                <IoNotifications />
              </span>
            </div>
          </header>
          <div className='content-container'>{renderContent()}</div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UDash;