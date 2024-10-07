import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import subscribeIcon from '../assets/subscribe-icon.png';
import pinnitLogo from '../assets/pinnit_logo.png';
import MenuDrawer from './MenuDrawer';
import menuButtonIcon from '../assets/Menu.png';
import '../styles/Header.css';
import '../styles/MobileHeader.css';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleAddEventClick = () => {
    navigate('/add-event');
    window.scrollTo(0, 0); // Ensure the page scrolls to the top when navigating
  };

  const handleSubscribeClick = () => {
    navigate('/subscribe');
    window.scrollTo(0, 0);
  };

  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="background-image">
        <div className="logo-container">
          <img src={pinnitLogo} alt="Pinnit Logo" className="header-logo" />
        </div>
      </div>
      <div className="subscribe-banner">
        <img
          src={subscribeIcon}
          alt="Subscribe Icon"
          className="subscribe-icon"
          onClick={handleSubscribeClick} // Apply onClick to the icon
        />
        <span
          className="subscribe-text"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleSubscribeClick} // Apply onClick to the text
        >
          Click here to subscribe to the UBC events newsletter
        </span>
      </div>
      <Button
        variant="contained"
        className="add-event-button"
        onClick={handleAddEventClick}
      >
        <span className="add-event-text">+ Add Event</span>
        <span className="add-event-icon">+</span>
      </Button>
      <img
        src={menuButtonIcon}
        alt="Menu"
        className="menu-button"
        onClick={toggleMenuDrawer}
      />
      <MenuDrawer open={isMenuOpen} onClose={toggleMenuDrawer} />
    </header>
  );
}

export default Header;
