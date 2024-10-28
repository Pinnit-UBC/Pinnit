import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
//import pinnitLogo from '../assets/pinnit_logo.png';
import halloweenLogo from "../assets/pinnit_halloween_logo.png"; // Temporary logo for halloween
import MenuDrawer from "./ui/menu_drawer/MenuDrawer";
import menuButtonIcon from "../assets/Menu.png";
import "../styles/Header.css";
import "../styles/MobileHeader.css";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleAddEventClick = () => {
    navigate("/add-event");
    window.scrollTo(0, 0); // Ensure the page scrolls to the top when navigating
  };

  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="subscribe-banner">
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
      </div>
      <div className="background-image">
        <div className="logo-container">
          <img src={halloweenLogo} alt="Pinnit Logo" className="header-logo" />
        </div>
      </div>
    </header>
  );
}

export default Header;
