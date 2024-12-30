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
        <br />
        <p><strong>Here’s what’s coming soon:</strong></p>
        <ul>
          <li>🔒 <strong>Login System:</strong> Easily save your favorite events and track them in one place.</li>
          <li>✨ <strong>Personalized Club and Event Recommendations:</strong> Discover activities tailored to your interests.</li>
          <li>📋 <strong>Customized Dashboard:</strong> Your events, your way—organized just for you.</li>
        </ul>
        <p>
          <br />
          <strong>Join the waitlist and stay tuned—we’ll be back better than ever! 🚀</strong>
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/assets/template.svg`}
          alt="Pinnit UBC Upgrade"
          style={{
            marginTop: '20px',
            width: '100%',
            maxWidth: '500px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <button
          className="signup-button"
          style={{
            marginTop: '20px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          onClick={() =>
            window.open(
              'https://forms.gle/dhnic9H5qTpPYtsh9',
              '_blank'
            )
          }
        >
          ✍️ Join the waitlist now
        </button>
        <p
          className="continue-link"
          onClick={handleClose}
          style={{
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px',
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
