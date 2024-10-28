import React, { useState, useRef, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MobileDrawerMap from "./MobileDrawerMap";
import "../../styles/MobileEventDrawer.css";

function formatTime(time) {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function formatTag(tag) {
  switch (tag) {
    case "culture-community":
      return "Culture & Community";
    case "academic-professional":
      return "Academic & Professional";
    case "sports-fitness":
      return "Sports & Fitness";
    case "arts-performance":
      return "Arts & Performance";
    case "social":
      return "Social";
    case "other":
      return "Other";
    default:
      return tag;
  }
}

function MobileEventDrawer({ event, open, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef(null);

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

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
        console.error("Error sharing event:", error);
      }
    } else {
      alert("Your browser does not support the share feature.");
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
    };
  }, [open]);

  if (!event) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "100vw",
            backgroundColor: "#393838",
            borderRadius: "15px 0px 0px 15px",
            overflow: "auto",
            border: "none",
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

  const imageUrl = event.image_url || "https://via.placeholder.com/120";
  const hasValidCoordinates =
    !isNaN(parseFloat(event.latitude)) && !isNaN(parseFloat(event.longitude));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100vw",
          backgroundColor: "#393838",
          borderRadius: "15px 0px 0px 15px",
          overflow: "auto",
          border: "none",
        },
      }}
    >
      <Box className="drawer-container">
        <Box className="drawer-header">
          <button className="drawer-close-button" onClick={onClose}>
            &times;
          </button>
        </Box>
        <Typography variant="h6" className="drawer-event-title">
          {event.event_title}
        </Typography>
        <Typography variant="subtitle1" className="drawer-event-time">
          {formatTime(event.start_time)}{" "}
          {event.end_time && `to ${formatTime(event.end_time)}`}
        </Typography>
        {event.image_url && (
          <Box
            sx={{ mt: 2, textAlign: "center" }}
            className="drawer-event-image-container"
          >
            <img src={imageUrl} alt="Event" className="drawer-event-image" />
          </Box>
        )}
        <Box className="drawer-info-container">
          <Typography variant="h6" className="drawer-section-header">
            The Event
          </Typography>
          <Divider
            variant="middle"
            sx={{ borderColor: "white", width: "100%", margin: "4px 0 16px" }}
          />
          <Box className="drawer-info-item">
            <img
              src="/assets/mdi_location.png"
              alt="Location Logo"
              className="drawer-location-icon"
            />
            <Typography variant="body2" className="drawer-info-text">
              {event.location}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img
              src="/assets/teenyicons_user-solid.png"
              alt="Host Logo"
              className="drawer-host-icon"
            />
            <Typography variant="body2" className="drawer-info-text">
              {event.host_organization}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img
              src="/assets/Signing A Document.png"
              alt="Registration Logo"
              className="drawer-registration-icon"
            />
            <Typography variant="body2" className="drawer-info-text">
              {event.registration_status}
            </Typography>
          </Box>
          {event.tags && event.tags.length > 0 && (
            <Box className="drawer-info-item drawer-tag-container">
              {event.tags.map((tag, index) => (
                <Typography
                  key={index}
                  component="span"
                  className="drawer-event-tag"
                >
                  {formatTag(tag)} {/* Apply the formatTag function */}
                </Typography>
              ))}
            </Box>
          )}
          {event.reference_link && (
            <Box className="drawer-info-item drawer-check-it-out-container">
              <Button
                className="drawer-button drawer-check-it-out-button"
                href={event.reference_link.startsWith("http") ? event.reference_link : `https://${event.reference_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check it out
              </Button>
            </Box>
          )}
          {/* Share Button */}
          <Box className="drawer-info-item drawer-check-it-out-container">
            <Button
              className="drawer-button drawer-share-button"
              onClick={handleShareClick}
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
            <Divider
              variant="middle"
              sx={{ borderColor: "white", width: "100%", margin: "4px 0 8px" }}
            />
            <Typography
              variant="body2"
              ref={descriptionRef}
              className={`drawer-event-description ${
                isExpanded ? "expanded" : ""
              }`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: isExpanded ? "unset" : 8,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                whiteSpace: "normal",
              }}
            >
              {event.activity_description}
            </Typography>
            <Button
              sx={{ color: "#6AA6F8", marginTop: "8px" }}
              onClick={handleToggleExpand}
            >
              {isExpanded ? "see less" : "see more"}
            </Button>
            {hasValidCoordinates && (
              <MobileDrawerMap
                latitude={event.latitude}
                longitude={event.longitude}
              />
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default MobileEventDrawer;
