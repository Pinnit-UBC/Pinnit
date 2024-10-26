import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import "./MenuDrawer.css";
import { useNavigate } from "react-router-dom";

function MenuDrawer({
  open,
  onClose,
  showNews = false,
  showClubs = 1,
  showAbout = false,
  showHelp = false,
  showDarkMode = false,
}) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigating
  };

  const handleExternalLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null; // Prevents the new window from accessing the original page
    onClose(); // Close the drawer after clicking the link
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{ paper: "menu-drawer-paper" }}
    >
      <Box className="drawer-container">
        <Box className="menu-item" onClick={() => handleNavigation("/")}>
          <span className="menu-item-text">Home</span>
        </Box>
        {showNews && (
          <Box className="menu-item" onClick={() => handleNavigation("/news")}>
            <span className="menu-item-text">Campus News</span>
          </Box>
        )}
        {showClubs && (
          <Box
            className="menu-item"
            onClick={() => handleNavigation("/clubs-organizations")}
          >
            <span className="menu-item-text">Clubs & Organizations</span>
          </Box>
        )}
        {/* New Feedback Form Tab */}
        <Box
          className="menu-item"
          onClick={() => handleNavigation("/feedback")}
        >
          <span className="menu-item-text">Feedback & Suggestions</span>
        </Box>
        <Box
          className="menu-item"
          onClick={() =>
            handleExternalLink(
              "https://docs.google.com/forms/d/e/1FAIpQLScTPtbg73l1FViQWTdzCrMsgjG-wfjtNlvnT1VC46PuLDgtfw/viewform?vc=0&c=0&w=1&flr=0"
            )
          }
        >
          <span className="menu-item-text">Join the team!</span>
        </Box>
        <Box
          className="menu-item"
          onClick={() =>
            handleExternalLink("https://www.instagram.com/pinnit_ubc/")
          }
        >
          <span className="menu-item-text">Follow us on Instagram</span>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MenuDrawer;
