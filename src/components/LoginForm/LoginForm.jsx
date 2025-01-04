import React, { useState } from 'react';
import './LoginForm.css';
import loginImage from './login.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

function LoginForm() {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

   const loginHandler = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!email) {
        toast.error("Email is required.");
        return;
    }
    if (!password) {
        toast.error("Password is required.");
        return;
    }

    setLoading(true);
    try {
        const { data } = await axios.post(`/login`, { email, password });
        setLoading(false);
        if (data?.error) {
            toast.error(data.error);
        } else {
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));
            toast.success("You logged in successfully");
            navigate("/");
        }
    } catch (err) {
        setLoading(false);
        toast.error("Something went wrong. Try again!");
    }
};


    return (
        <div className="loginForm_page">
            <div className="loginForm_container">
                {/* Left Column: Login Form */}
                <div className="loginForm_leftColumn">
                    <h2 className="loginForm_heading">Login</h2>
                    {loading && <div className="spinner"></div>}
                    <form onSubmit={loginHandler}>
                        {/* Email Field */}
                        <div className="loginForm_formGroup">
                            <label htmlFor="email" className="loginForm_label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="loginForm_input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="loginForm_formGroup">
                            <label htmlFor="password" className="loginForm_label">Password</label>
                            <div className="loginForm_passwordContainer">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    className="loginForm_input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="loginForm_passwordToggleIcon" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="options-row">
                            <div className="checkbox-group-login">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="checkbox-login"
                                />
                                <label htmlFor="terms" className="checkbox-label-signup">
                                    Remember Me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="loginForm_forgot">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="loginForm_submitButton" disabled={loading}>
                            {loading ? "Loading...." : "Login"}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <Link to="/signup" className="loginForm_signupLink">
                        Not registered yet? Create an account <span className="loginForm_signupText">SignUp</span>
                    </Link>
                </div>

                {/* Right Column: Image */}
                <div className="loginForm_rightColumn">
                    <img src={loginImage} alt="Login" />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;