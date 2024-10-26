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
        <h3 className="update-notes">October 20 Update notes</h3>
        <p> Thank you for all your support and feedback! We're excited to be working on some exciting updates behind the scenes. </p>
        <p>Follow us on Instagram @pinnit_ubc to stay updated on what's coming next!</p>
        <p></p>
        <ul>
          <li><strong>New Halloween Button</strong> to see all halloween activities</li>
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
