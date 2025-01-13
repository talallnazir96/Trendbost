import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from './logo.png';
import { useAuth } from '../../context/auth';

function Header() {
  const [auth, setAuth] = useAuth();
  const [shrink, setShrink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideMiddleLinks =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password';
  const showLoginButton = location.pathname === '/signup' || location.pathname === '/forgot-password';
  const showSignupButton = location.pathname === '/login';

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && !shrink) {
        setShrink(true);
      } else if (currentScrollY <= 50 && shrink) {
        setShrink(false);
      }
      previousScrollY = currentScrollY;
    };

    // Use throttling for better performance
    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [shrink]);

  return (
    <Navbar
      expand="lg"
      className={`header-navbar ${shrink ? 'shrink' : ''}`}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            className={`navbar-logo ${shrink ? 'shrink-logo' : ''}`}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!hideMiddleLinks && (
            <Nav className="mx-auto nav-links">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/services">SERVICES</Nav.Link>
              <Nav.Link href="/privacy-policy">PRIVACY POLICY</Nav.Link>
              <Nav.Link href="/about-us">ABOUT US</Nav.Link>
              <Nav.Link href="/contact-us">CONTACT US</Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto align-items-center">
            {!loggedIn ? (
              showLoginButton ? (
                <Button className="nav-btn" onClick={handleLogin}>LOGIN</Button>
              ) : showSignupButton ? (
                <Button className="nav-btn" onClick={handleSignup}>SIGNUP</Button>
              ) : (
                <Button className="nav-btn" onClick={handleLogin}>LOGIN</Button>
              )
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="nav-btn">
                  {auth.user?.username || "Profile"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="head-dropdown" style={{ right: 0, left: 'auto' }}>
                  <Dropdown.Item onClick={() => navigate('/user-dashboard')} className="head-dropdown-item">User Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} className="head-dropdown-item">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

// Utility function: Throttling
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
