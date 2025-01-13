import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaUsers, FaArrowLeft, FaUserFriends } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardGraphs = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [userData, setUserData] = useState({
    Facebook: { likes: 20, comments: 20, followers: 20 },
    TikTok: { likes: 10, comments: 10, followers: 10, liveAudience: 10 },
    Instagram: { likes: 15, comments: 15, followers: 15 },
    Twitter: { likes: 5, comments: 5, followers: 5 },
  });
  const [inputData, setInputData] = useState({ likes: 0, comments: 0, followers: 0, liveAudience: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null); // Track the form type to display
  const [urlInput, setUrlInput] = useState({ profileLink: '', postLink: '', liveLink: '' });

  const basicPlanLimit = 50;

  const handleDetailClick = (platform) => {
    setSelectedPlatform(platform);
    const platformData = userData[platform];
    setInputData({
      likes: platformData.likes,
      comments: platformData.comments,
      followers: platformData.followers,
      liveAudience: platformData.liveAudience || 0,
    });
  };

  const handleBackClick = () => {
    setShowForm(false);
    setSelectedPlatform(null);
    setFormType(null); // Reset form type
  };

  const handleInputChange = (type, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleApply = (type) => {
    const platform = selectedPlatform;
    const newValue = inputData[type];
    const totalValue = userData[platform][type] + newValue;

    if (totalValue > basicPlanLimit) {
      toast.error(`Please upgrade your plan to exceed the limit of ${basicPlanLimit} ${type}`);
      return;
    }

    setFormType(type); // Set the type of input field (likes, comments, followers, liveAudience)
    setShowForm(true);
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrlInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProceed = () => {
    const platform = selectedPlatform;
    const newValue = inputData[formType];
    setUserData((prevState) => ({
      ...prevState,
      [platform]: {
        ...prevState[platform],
        [formType]: prevState[platform][formType] + newValue,
      },
    }));
    toast.success(`You successfully got ${formType} for ${selectedPlatform}`);
    setShowForm(false);
    setFormType(null); // Reset form type
  };

  const chartStyle = {
    width: '100px',
    height: '100px',
    margin: '10px auto'
  };

  return (
    <div className="dashboard-graphs">
      <Toaster />
      <div className={`dashboard-graphs-cards ${selectedPlatform ? "hidden" : ""}`}>
        {["Facebook", "TikTok", "Instagram", "Twitter"].map((platform) => {
          const { likes, comments, followers, liveAudience } = userData[platform];
          return (
            <div className={`dashboard-graphs-card ${platform === "TikTok" ? "dashboard-graphs-card-tiktok" : ""}`} key={platform}>
              <div className="dashboard-graphs-card-header">
                <h3 className="dashboard-graphs-chart-head">
                  {platform} Status <span className="dashboard-graphs-head-stats">(overall)</span>
                </h3>
                <div className="dashboard-graphs-menu">
                  <span className="dashboard-graphs-three-dots">&#8226;&#8226;&#8226;</span>
                  <div className="dashboard-graphs-menu-content">
                    <button
                      className="dashboard-graphs-detail-button"
                      onClick={() => handleDetailClick(platform)}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboard-graphs-chart-container">
                <div className="dashboard-graphs-pie-chart" style={chartStyle}>
                  <CircularProgressbar
                    value={likes}
                    maxValue={basicPlanLimit}
                    text={`${likes}/${basicPlanLimit}`}
                    strokeWidth={20}
                    styles={buildStyles({
                      pathColor: `rgba(105, 56, 243, ${likes / basicPlanLimit})`,
                      textColor: '#4A4A4A',
                    })}
                  />
                  <p className="dashboard-graphs-chart-label">Likes</p>
                </div>
                <div className="dashboard-graphs-pie-chart" style={chartStyle}>
                  <CircularProgressbar
                    value={comments}
                    maxValue={basicPlanLimit}
                    text={`${comments}/${basicPlanLimit}`}
                    strokeWidth={20}
                    styles={buildStyles({
                      pathColor: `rgba(105, 56, 243, ${comments / basicPlanLimit})`,
                      textColor: '#4A4A4A',
                    })}
                  />
                  <p className="dashboard-graphs-chart-label">Comments</p>
                </div>
                <div className="dashboard-graphs-pie-chart" style={chartStyle}>
                  <CircularProgressbar
                    value={followers}
                    maxValue={basicPlanLimit}
                    text={`${followers}/${basicPlanLimit}`}
                    strokeWidth={20}
                    styles={buildStyles({
                      pathColor: `rgba(197, 59, 247, ${followers / basicPlanLimit})`,
                      textColor: '#4A4A4A',
                    })}
                  />
                  <p className="dashboard-graphs-chart-label">Followers</p>
                </div>
                {platform === "TikTok" && (
                  <div className="dashboard-graphs-pie-chart" style={chartStyle}>
                    <CircularProgressbar
                      value={liveAudience}
                      maxValue={basicPlanLimit}
                      text={`${liveAudience}/${basicPlanLimit}`}
                      strokeWidth={20}
                      styles={buildStyles({
                        pathColor: `rgba(105, 56, 243, ${liveAudience / basicPlanLimit})`,
                        textColor: '#4A4A4A',
                      })}
                    />
                    <p className="dashboard-graphs-chart-label">Live Audience</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedPlatform && !showForm && renderDetail()}
      {showForm && (
        <div className="dashboard-graphs-detail show-form">
          <div className="dashboard-graphs-detail-header">
            <FaArrowLeft className="dashboard-graphs-back-button" onClick={handleBackClick} />
            <h3 className="dashboard-graphs-detail-heading">
              {formType === 'liveAudience' ? 'Add TikTok Live Link' : 'Add Links'}
            </h3>
          </div>
          <div className="addlink-form-row">
            {formType === 'liveAudience' ? (
              <div className="addlink-form-group">
                <input
                  type="text"
                  name="liveLink"
                  value={urlInput.liveLink}
                  placeholder="Add Live Link"
                  onChange={handleUrlChange}
                />
              </div>
            ) : (
              <>
                <div className="addlink-form-group">
                  <input
                    type="text"
                    name="profileLink"
                    value={urlInput.profileLink}
                    placeholder="Add Profile Link"
                    onChange={handleUrlChange}
                  />
                </div>
                <div className="addlink-form-group">
                  <input
                    type="text"
                    name="postLink"
                    value={urlInput.postLink}
                    placeholder="Add Post Link"
                    onChange={handleUrlChange}
                  />
                </div>
              </>
            )}
          </div>
          <div className="button-container">
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );

  function renderDetail() {
    if (!selectedPlatform) return null;

    const { likes, comments, followers, liveAudience } = userData[selectedPlatform];

    return (
      <div className="dashboard-graphs-detail">
        <div className="dashboard-graphs-detail-header">
          <FaArrowLeft className="dashboard-graphs-back-button" onClick={handleBackClick} />
          <h3 className="dashboard-graphs-detail-heading">{selectedPlatform} Details</h3>
        </div>
        <div className="dashboard-graphs-detail-container">
          <div className="dashboard-graphs-detail-item">
            <FaThumbsUp className="dashboard-graphs-detail-icon" />
            <div className="dashboard-graphs-detail-content">
              <p className="dashboard-graphs-chart-label-2">Likes</p>
              <input
                type="number"
                value={inputData.likes}
                onChange={(e) => handleInputChange("likes", parseInt(e.target.value))}
                max={basicPlanLimit}
              />
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply("likes")}
                disabled={inputData.likes === userData[selectedPlatform].likes}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="dashboard-graphs-detail-item">
            <FaComment className="dashboard-graphs-detail-icon" />
            <div className="dashboard-graphs-detail-content">
              <p className="dashboard-graphs-chart-label-2">Comments</p>
              <input
                type="number"
                value={inputData.comments}
                onChange={(e) => handleInputChange("comments", parseInt(e.target.value))}
                max={basicPlanLimit}
              />
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply("comments")}
                disabled={inputData.comments === userData[selectedPlatform].comments}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="dashboard-graphs-detail-item">
            <FaUsers className="dashboard-graphs-detail-icon" />
            <div className="dashboard-graphs-detail-content">
              <p className="dashboard-graphs-chart-label-2">Followers</p>
              <input
                type="number"
                value={inputData.followers}
                onChange={(e) => handleInputChange("followers", parseInt(e.target.value))}
                max={basicPlanLimit}
              />
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply("followers")}
                disabled={inputData.followers === userData[selectedPlatform].followers}
              >
                Apply
              </button>
            </div>
          </div>
          {selectedPlatform === "TikTok" && (
            <div className="dashboard-graphs-detail-item">
              <FaUserFriends className="dashboard-graphs-detail-icon" />
              <div className="dashboard-graphs-detail-content">
                <p className="dashboard-graphs-chart-label-2">Live Audience</p>
                <input
                  type="number"
                  value={inputData.liveAudience}
                  onChange={(e) => handleInputChange("liveAudience", parseInt(e.target.value))}
                  max={basicPlanLimit}
                />
                <button
                  className="dashboard-graphs-apply-button"
                  onClick={() => handleApply("liveAudience")}
                  disabled={inputData.liveAudience === userData[selectedPlatform].liveAudience}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default DashboardGraphs;