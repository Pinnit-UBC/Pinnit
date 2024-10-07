import React, { useState, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DrawerMap from './DrawerMap';
import { useNavigate } from 'react-router-dom';
import '../styles/EventDrawer.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function formatTag(tag) {
  switch (tag) {
    case 'culture-community':
      return 'Culture & Community';
    case 'academic-professional':
      return 'Academic & Professional';
    case 'sports-fitness':
      return 'Sports & Fitness';
    case 'arts-performance':
      return 'Arts & Performance';
    case 'social':
      return 'Social';
    default:
      return tag;
  }
}

function EventDrawer({ event, open, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef(null);
  const navigate = useNavigate();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShareClick = async () => {
    const eventUrl = `https://pinnitubc.com/event/${event._id}`;
    const shareText = `Check out this event happening on campus! ${eventUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.event_title,
          text: shareText,
          url: eventUrl,
        });
      } catch (error) {
        console.error('Error sharing event:', error);
      }
    } else {
      alert('Your browser does not support the share feature.');
    }
  };

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  if (!event) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '50vw',
            backgroundColor: '#393838',
            borderRadius: '15px 0px 0px 15px',
            overflow: 'auto',
            border: 'none',
          },
        }}
      >
        <Box className="drawer-container">
          <Typography variant="body1" color="white">
            No event data available.
          </Typography>
        </Box>
      </Drawer>
    );
  }

  const imageUrl = event.image_url || 'https://via.placeholder.com/120';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '50vw',
          backgroundColor: '#393838',
          borderRadius: '15px 0px 0px 15px',
          overflow: 'auto',
          border: 'none',
        },
      }}
    >
      <Box className="drawer-container">
        <Box className="drawer-header">
          <button className="drawer-close-button" onClick={handleClose}>
            &times;
          </button>
        </Box>
        <Typography variant="h6" className="drawer-event-title">
          {event.event_title}
        </Typography>
        <Typography variant="subtitle1" className="drawer-event-time">
          {formatTime(event.start_time)}{event.end_time && ` to ${formatTime(event.end_time)}`}
        </Typography>
        {event.image_url && (
          <Box sx={{ mt: 2, textAlign: 'center' }} className="drawer-event-image-container">
            <img src={imageUrl} alt="Event" className="drawer-event-image" />
          </Box>
        )}
        <Box className="drawer-info-container">
          <Typography variant="h6" className="drawer-section-header">
            The Event
          </Typography>
          <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
          <Box className="drawer-info-item">
            <img src="/assets/mdi_location.png" alt="Location Logo" className="drawer-location-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.location}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="drawer-host-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.host_organization}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src="/assets/Signing A Document.png" alt="Registration Logo" className="drawer-registration-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.registration_status}
            </Typography>
          </Box>
          {event.tags && event.tags.length > 0 && (
            <Box className="drawer-info-item">
              <img src="/assets/Tag.png" alt="Tag Logo" className="drawer-tag-icon" />
              <Box className="drawer-tag-container">
                {event.tags.map((tag, index) => (
                  <span key={index} className="drawer-tag">
                    {formatTag(tag)}
                  </span>
                ))}
              </Box>
            </Box>
          )}
          {event.reference_link && (
            <Box className="drawer-info-item" sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                href={event.reference_link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#6AA6F8',
                  borderColor: 'transparent',
                  width: '75%',
                  '&:hover': {
                    backgroundColor: '#6AA6F8',
                  },
                }}
              >
                Check it out
              </Button>
            </Box>
          )}
          {/* Move the Share Event button below the Check it out button */}
          <Box className="drawer-info-item" sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleShareClick}
              sx={{
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: '#FF6347',
                borderColor: 'transparent',
                width: '75%',
                '&:hover': {
                  backgroundColor: '#FF4500',
                },
              }}
            >
              Share Event
            </Button>
          </Box>
        </Box>
        {event.activity_description && (
          <Box className="drawer-event-details-container">
            <Typography variant="h6" className="drawer-section-header">
              The Details
            </Typography>
            <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
            <Typography
              variant="body2"
              ref={descriptionRef}
              className={`drawer-event-description ${isExpanded ? 'expanded' : ''}`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 8,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                whiteSpace: 'normal',
              }}
            >
              {event.activity_description}
            </Typography>
            <Button
              sx={{ color: '#6AA6F8', marginTop: '8px' }}
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'see less' : 'see more'}
            </Button>
          </Box>
        )}
        {(event.latitude !== null && event.longitude !== null) && (
          <Box sx={{ mt: 2 }}>
            <DrawerMap latitude={event.latitude} longitude={event.longitude} />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default EventDrawer;
