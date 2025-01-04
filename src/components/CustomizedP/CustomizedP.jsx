import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomizedP.css';
import { RiUserFollowLine } from "react-icons/ri";

const CustomizedP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const platform = location.state?.platform;

    useEffect(() => {
        if (!platform) {
            console.error("Platform name is missing in the location state.");
        }
    }, [platform]);

    const [likes, setLikes] = useState(50);
    const [reactions, setReactions] = useState(100);
    const [comments, setComments] = useState(1000);
    const [liveAudience, setLiveAudience] = useState(0);
    const [isYearly, setIsYearly] = useState(false);

    const handleGenerateClick = () => {
        navigate('/payment');
    };

    const handleToggle = (type) => {
        setIsYearly(type === 'yearly');
        if (type === 'yearly') {
            setLikes(50 * 12);
            setReactions(100 * 12);
            setComments(1000 * 12);
            setLiveAudience(0 * 12);
        } else {
            setLikes(50);
            setReactions(100);
            setComments(1000);
            setLiveAudience(0);
        }
    };

    return (
        <div className='custom'>
            <div className='customized-plan-head'>
                <h1>Choose Your Plan</h1>
                <div className="toggle-button">
                    <button
                        className={`toggle-btnn ${!isYearly ? 'active' : ''}`}
                        onClick={() => handleToggle('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`toggle-btnn ${isYearly ? 'active' : ''}`}
                        onClick={() => handleToggle('yearly')}
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div className="customized-plans-container">
                <h2>
                    Customized Plans For {platform || <span style={{ color: 'red' }}>[Platform Missing]</span>} Subscription
                </h2>

                {platform === 'TikTok Live' ? (
                    <div className="custpay-input-container">
                        <label className='custp-label'>📺 Live Audience</label>
                        <input
                            type="number"
                            value={liveAudience}
                            onChange={(e) => setLiveAudience(e.target.value)}
                            min="0"
                            className='custp-input'
                        />
                    </div>
                ) : (
                    <>
                        <div className="custpay-input-container">
                            <label className='custp-label'>👍 Likes</label>
                            <input
                                type="number"
                                value={likes}
                                onChange={(e) => setLikes(e.target.value)}
                                min="0"
                                className='custp-input'
                            />
                        </div>
                        <div className="custpay-input-container">
                            <label className='custp-label'>💬 Comments</label>
                            <input
                                type="number"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                min="0"
                                className='custp-input'
                            />
                        </div>
                        <div className="custpay-input-container">
                            <label className='custp-label'><RiUserFollowLine className='follower-icon' />Follower</label>
                            <input
                                type="number"
                                value={reactions}
                                onChange={(e) => setReactions(e.target.value)}
                                min="0"
                                className='custp-input'
                            />
                        </div>
                    </>
                )}

                <button className="generate-button" onClick={handleGenerateClick}>Generate</button>
            </div>
        </div>
    );
};

export default CustomizedP;