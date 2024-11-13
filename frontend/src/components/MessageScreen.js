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
        <h3 className="update-notes">November 12 Update notes</h3>
        <p>Happy Reading Week, everyone! We hope you had a fantastic break, enjoyed some well-deserved rest, and are feeling refreshed!</p>
        <p>Follow us on Instagram @pinnit_ubc to stay updated on what's coming next!</p>
        <p></p>
        <ul>
          <li><strong>More Events Posted</strong> from continously improving backend </li>

          <h3 className="update-notes">Upcoming new features!</h3>
          <li>Login and create accounts!</li>
          <li>Save and favorite events</li>
          <li>Event recommendation system</li>
          <li>Transition to new UI</li>
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
