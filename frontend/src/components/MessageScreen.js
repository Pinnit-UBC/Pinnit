import React, { useState, useEffect } from 'react';
import '../styles/MessageScreen.css';

const MessageScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const messageSeen = localStorage.getItem('messageSeen');
    if (messageSeen === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="message-overlay">
      <div className="message-box">
        <div className="message-header">
          <h2>🚧 Website Maintenance Announcement 🚧</h2>
        </div>
        <p>
          We’re thrilled to announce that <strong>Pinnit UBC</strong> is undergoing maintenance as we prepare to roll out some <strong>major updates and exciting new features</strong> based on the amazing feedback we’ve received from students like you! 🎉
        </p>
        <br></br>
        <p><strong>Here’s what’s coming soon:</strong></p>
        <ul>
          <li>🔒 <strong>Login System:</strong> Easily save your favorite events and track them in one place.</li>
          <li>✨ <strong>Personalized Club and Event Recommendations:</strong> Discover activities tailored to your interests.</li>
          <li>📋 <strong>Customized Dashboard:</strong> Your events, your way—organized just for you.</li>
        </ul>
        <p>
          <strong>We're getting ready to launch! Sign up for the waitlist and stay tuned 🚀 </strong>
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Update-Pinnit.svg`}
          alt="Pinnit UBC Upgrade"
          style={{ marginTop: '120px', width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto', paddingTop: '00px'}}
        />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className="signup-button"
            onClick={() =>
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSeD7CAb3ZrM-AQvsdM9cz_w7KRkqjEqQTXKbR_gulWdsB_aog/viewform?usp=dialog',
                '_blank'
              )
            }
          >
            ✍️ Join the Waitlist 
          </button>
        </div>
        <p
          className="continue-link"
          onClick={handleClose}
          style={{
            color: '#ADD8E6',
            cursor: 'pointer',
            marginTop: '10px',
            textAlign: 'center',
          }}
        >
          Continue to Pinnit UBC
        </p>
      </div>
    </div>
  );
};

export default MessageScreen;
