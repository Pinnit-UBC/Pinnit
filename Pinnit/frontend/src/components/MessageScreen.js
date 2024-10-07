import React, { useState, useEffect } from 'react';
import '../styles/MessageScreen.css';

const MessageScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const messageSeen = localStorage.getItem('messageSeen');
    if (messageSeen === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClose = () => {
    if (isChecked) {
      localStorage.setItem('messageSeen', 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="message-overlay">
      <div className="message-box">
        <h2>Welcome to Pinnit UBC!</h2>
        <p>Check out everything happening on campus!</p>
        <h3 className="update-notes">September 14 update notes</h3>
        <p>Thanks for a great first week! We've heard your feedback and here’s the new update!</p>
        <ul>
          <li><strong>Added Master List</strong> with all club and faculty accounts</li>
          <li><strong>Added Feedback Form</strong> for comments & suggestions!</li>
          <li><strong>UI changes</strong> to mobile viewing</li>
          <li><strong>Bug fix</strong> to mobile viewing</li>
        </ul>
        <div className="checkbox-container">
          <input type="checkbox" id="acknowledge" checked={isChecked} onChange={handleCheckboxChange} />
          <label htmlFor="acknowledge">Don't show me again</label>
        </div>
        <button onClick={handleClose}>Got it!</button>
      </div>
    </div>
  );
};

export default MessageScreen;
