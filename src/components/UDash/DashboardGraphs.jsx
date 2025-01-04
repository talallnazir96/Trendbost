import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaUsers, FaArrowLeft, FaUserFriends } from 'react-icons/fa';
import { Range, getTrackBackground } from 'react-range';
import toast, { Toaster } from 'react-hot-toast';

const DashboardGraphs = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [userData, setUserData] = useState({
    Facebook: { likes: 100, comments: 100, followers: 100 },
    TikTok: { likes: 50, comments: 60, followers: 70, liveAudience: 40 },
    Instagram: { likes: 80, comments: 90, followers: 100 },
    Twitter: { likes: 30, comments: 40, followers: 50 },
  });
  const [selectedRange, setSelectedRange] = useState({ likes: 0, comments: 0, followers: 0, liveAudience: 0 });
  const [rangeLimits, setRangeLimits] = useState({ likes: 0, comments: 0, followers: 0, liveAudience: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null); // Track the form type to display

  const totalData = {
    likes: 500,
    comments: 500,
    followers: 500,
    liveAudience: 100,
  };

  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  const handleDetailClick = (platform) => {
    setSelectedPlatform(platform);
    const platformData = userData[platform];
    setSelectedRange({
      likes: platformData.likes,
      comments: platformData.comments,
      followers: platformData.followers,
      liveAudience: platformData.liveAudience || 0,
    });
    setRangeLimits({
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

  const handleRangeChange = (type, value) => {
    if (value >= rangeLimits[type]) {
      setSelectedRange((prevState) => ({
        ...prevState,
        [type]: value,
      }));
    }
  };

  const handleApply = (platform, type) => {
    setFormType(type); // Set the form type based on the selected range type
    setShowForm(true);
  };

  const handleProceed = () => {
    const platform = selectedPlatform;
    const type = Object.keys(selectedRange).find(key => selectedRange[key] > userData[platform][key]);
    const newValue = selectedRange[type];
    setUserData((prevState) => ({
      ...prevState,
      [platform]: {
        ...prevState[platform],
        [type]: newValue,
      },
    }));
    setRangeLimits((prevState) => ({
      ...prevState,
      [type]: newValue,
    }));

    toast.success(`You successfully got ${type} for ${selectedPlatform}`);
    setShowForm(false);
    setFormType(null); // Reset form type
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
                <div className="dashboard-graphs-pie-chart-1">
                  <div className="dashboard-graphs-pie-chart">
                    <span className="dashboard-graphs-chart-percentage">
                      {calculatePercentage(likes, totalData.likes)}%
                    </span>
                  </div>
                  <p className="dashboard-graphs-chart-label">Likes</p>
                </div>
                <div className="dashboard-graphs-pie-chart-2">
                  <div className="dashboard-graphs-pie-chart">
                    <span className="dashboard-graphs-chart-percentage">
                      {calculatePercentage(comments, totalData.comments)}%
                    </span>
                  </div>
                  <p className="dashboard-graphs-chart-label">Comments</p>
                </div>
                <div className="dashboard-graphs-pie-chart-3">
                  <div className="dashboard-graphs-pie-chart dashboard-graphs-pie-chart-follow">
                    <span className="dashboard-graphs-chart-percentage">
                      {calculatePercentage(followers, totalData.followers)}%
                    </span>
                  </div>
                  <p className="dashboard-graphs-chart-label">Followers</p>
                </div>
                {platform === "TikTok" && (
                  <div className="dashboard-graphs-pie-chart-4">
                    <div className="dashboard-graphs-pie-chart">
                      <span className="dashboard-graphs-chart-percentage">
                        {calculatePercentage(liveAudience, totalData.liveAudience)}%
                      </span>
                    </div>
                    <p className="dashboard-graphs-chart-label">Live Audience</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedPlatform && !showForm && renderDetail()}
      {showForm && formType !== 'liveAudience' && (
        <div className="dashboard-graphs-detail show-form">
          <div className="dashboard-graphs-detail-header">
            <FaArrowLeft className="dashboard-graphs-back-button" onClick={handleBackClick} />
            <h3 className="dashboard-graphs-detail-heading">Add Links</h3>
          </div>
          <div className="addlink-form-row">
            <div className="addlink-form-group">
              <input type="text" placeholder="Add Profile Link" />
            </div>
            <div className="addlink-form-group">
              <input type="text" placeholder="Add Post Link" />
            </div>
          </div>
          <div className="button-container">
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      )}
      {showForm && formType === 'liveAudience' && (
        <div className="dashboard-graphs-detail show-form">
          <div className="dashboard-graphs-detail-header">
            <FaArrowLeft className="dashboard-graphs-back-button" onClick={handleBackClick} />
            <h3 className="dashboard-graphs-detail-heading">Add TikTok Live Link</h3>
          </div>
          <div className="addlink-form-row">
            <div className="addlink-form-group">
              <input type="text" placeholder="Add Live Link" />
            </div>
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
              <div className="dashboard-graphs-range-container">
                <Range
                  step={100}
                  min={rangeLimits.likes}
                  max={totalData.likes - 1} // ensures min is less than max
                  values={[selectedRange.likes]}
                  onChange={(values) => handleRangeChange("likes", values[0])}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        background: getTrackBackground({
                          values: [selectedRange.likes],
                          colors: ['#6938F3', '#ccc'],
                          min: rangeLimits.likes,
                          max: totalData.likes,
                        }),
                        borderRadius: '4px'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '14px',
                        width: '14px',
                        backgroundColor: '#FFF',
                        border: '1px solid #CCC',
                        borderRadius: '50%',
                        position: 'relative',
                      }}
                    >
                      <div className="range-badge">{selectedRange.likes}</div>
                    </div>
                  )}
                />
              </div>
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply(selectedPlatform, "likes")}
                disabled={selectedRange.likes === rangeLimits.likes}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="dashboard-graphs-detail-item">
            <FaComment className="dashboard-graphs-detail-icon" />
            <div className="dashboard-graphs-detail-content">
              <p className="dashboard-graphs-chart-label-2">Comments</p>
              <div className="dashboard-graphs-range-container">
                <Range
                  step={100}
                  min={rangeLimits.comments}
                  max={totalData.comments - 1}
                  values={[selectedRange.comments]}
                  onChange={(values) => handleRangeChange("comments", values[0])}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        background: getTrackBackground({
                          values: [selectedRange.comments],
                          colors: ['#6938F3', '#ccc'],
                          min: rangeLimits.comments,
                          max: totalData.comments,
                        }),
                        borderRadius: '4px'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '14px',
                        width: '14px',
                        backgroundColor: '#FFF',
                        border: '1px solid #CCC',
                        borderRadius: '50%',
                        position: 'relative',
                      }}
                    >
                      <div className="range-badge">{selectedRange.comments}</div>
                    </div>
                  )}
                />
              </div>
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply(selectedPlatform, "comments")}
                disabled={selectedRange.comments === rangeLimits.comments}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="dashboard-graphs-detail-item">
            <FaUsers className="dashboard-graphs-detail-icon" />
            <div className="dashboard-graphs-detail-content">
              <p className="dashboard-graphs-chart-label-2">Followers</p>
              <div className="dashboard-graphs-range-container">
                <Range
                  step={100}
                  min={rangeLimits.followers}
                  max={totalData.followers - 1} // ensures min is less than max
                  values={[selectedRange.followers]}
                  onChange={(values) => handleRangeChange("followers", values[0])}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        background: getTrackBackground({
                          values: [selectedRange.followers],
                          colors: ['#6938F3', '#ccc'],
                          min: rangeLimits.followers,
                          max: totalData.followers,
                        }),
                        borderRadius: '4px'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '14px',
                        width: '14px',
                        backgroundColor: '#FFF',
                        border: '1px solid #CCC',
                        borderRadius: '50%',
                        position: 'relative',
                      }}
                    >
                      <div className="range-badge">{selectedRange.followers}</div>
                    </div>
                  )}
                />
              </div>
              <button
                className="dashboard-graphs-apply-button"
                onClick={() => handleApply(selectedPlatform, "followers")}
                disabled={selectedRange.followers === rangeLimits.followers}
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
                <div className="dashboard-graphs-range-container">
                  <Range
                    step={10}
                    min={rangeLimits.liveAudience}
                    max={totalData.liveAudience - 1} // ensures min is less than max
                    values={[selectedRange.liveAudience]}
                    onChange={(values) => handleRangeChange("liveAudience", values[0])}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          background: getTrackBackground({
                            values: [selectedRange.liveAudience],
                            colors: ['#6938F3', '#ccc'],
                            min: rangeLimits.liveAudience,
                            max: totalData.liveAudience,
                          }),
                          borderRadius: '4px'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '14px',
                          width: '14px',
                          backgroundColor: '#FFF',
                          border: '1px solid #CCC',
                          borderRadius: '50%',
                          position: 'relative',
                        }}
                      >
                        <div className="range-badge">{selectedRange.liveAudience}</div>
                      </div>
                    )}
                  />
                </div>
                <button
                  className="dashboard-graphs-apply-button"
                  onClick={() => handleApply(selectedPlatform, "liveAudience")}
                  disabled={selectedRange.liveAudience === rangeLimits.liveAudience}
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