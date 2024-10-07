import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../styles/MenuDrawer.css';
import { useNavigate } from 'react-router-dom';

const DarkModeButton = styled(Button)(({ theme, darkMode }) => ({
  color: darkMode ? '#FFFFFF' : '#000000',
  backgroundColor: darkMode ? '#000000' : '#FFFFFF',
  '&:hover': {
    backgroundColor: darkMode ? '#333333' : '#DDDDDD',
  },
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: 'none',
  lineHeight: 1.5,
  boxShadow: 'none',
  '&:active': {
    boxShadow: 'none',
    backgroundColor: darkMode ? '#000000' : '#FFFFFF',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,.5)',
  },
}));

function MenuDrawer({ 
  open, 
  onClose, 
  showNews = false, 
  showClubs = 1,  
  showAbout = false, 
  showHelp = false, 
  showDarkMode = false 
}) {
  const [darkMode, setDarkMode] = React.useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigating
  };

  const handleExternalLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null; // Prevents the new window from accessing the original page
    onClose(); // Close the drawer after clicking the link
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{ paper: 'menu-drawer-paper' }}
    >
      <Box className="drawer-container">
        <Box className="menu-item" onClick={() => handleNavigation('/')}>
          <span className="menu-item-text">Home</span>
        </Box>
        {showNews && (
          <Box className="menu-item" onClick={() => handleNavigation('/news')}>
            <span className="menu-item-text">Campus News</span>
          </Box>
        )}
        {showClubs && (
          <Box className="menu-item" onClick={() => handleNavigation('/clubs-organizations')}>
            <span className="menu-item-text">Clubs & Organizations</span>
          </Box>
        )}
        {showAbout && (
          <Box className="menu-item" onClick={() => handleNavigation('/about')}>
            <span className="menu-item-text">About</span>
          </Box>
        )}
        {showHelp && (
          <Box className="menu-item" onClick={() => handleNavigation('/help')}>
            <span className="menu-item-text">Help</span>
          </Box>
        )}
        {/* New Feedback Form Tab */}
        <Box className="menu-item" onClick={() => handleNavigation('/feedback')}>
          <span className="menu-item-text">Feedback & Suggestions</span>
        </Box>
        <Box className="menu-item" onClick={() => handleExternalLink('https://docs.google.com/forms/d/e/1FAIpQLScTPtbg73l1FViQWTdzCrMsgjG-wfjtNlvnT1VC46PuLDgtfw/viewform?vc=0&c=0&w=1&flr=0')}>
          <span className="menu-item-text">Join the team!</span>
        </Box>
        <Box className="menu-item" onClick={() => handleExternalLink('https://www.instagram.com/pinnit_ubc/')}>
          <span className="menu-item-text">Follow us on Instagram</span>
        </Box>
        {showDarkMode && (
          <Box className="drawer-footer">
            <Stack direction="row" spacing={2} justifyContent="center">
              <DarkModeButton darkMode={darkMode ? 1 : 0} variant="contained" onClick={handleToggle}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </DarkModeButton>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default MenuDrawer;
