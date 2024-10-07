import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import '../styles/MobileFilterButton.css';
import filterIcon from '../assets/Filter.png';

// Removed 'Other' from the tag options
const tagOptions = ['Culture & Community', 'Academic & Professional', 'Sports & Fitness', 'Arts & Performance', 'Social', 'Health & Wellness', 'Varsity Sports'];

function MobileFilterButton({ onFilterChange, onPopularEventsClick }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isPopularEventsActive, setIsPopularEventsActive] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, [], []); // Pass empty arrays for faculty and degree levels
    };

    const handlePopularEventsClick = () => {
        onPopularEventsClick();
        setIsPopularEventsActive(!isPopularEventsActive);
    };

    return (
        <div className="filter-button-container">
            <button className="mobile-filter-button" onClick={toggleDrawer(true)}>
                <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
            </button>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '80%',
                        backgroundColor: '#323131',
                        borderRadius: '0px 15px 15px 0px',
                        overflow: 'auto',
                        border: 'none',
                    },
                }}
            >
                <div className="filter-options-container">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={handlePopularEventsClick}
                        className={isPopularEventsActive ? 'popular-events-active' : ''}
                        sx={{
                            backgroundColor: '#6AA6F8',
                            color: 'white',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            height: '60px', // Increased height of the button
                            fontSize: '16px', // Increased font size of the text
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#5f94e6',
                            }
                        }}
                    >
                        View Popular Events
                    </Button>
                    <div className="filter-group">
                        <h4>Filter</h4> {/* Changed 'Tags' to 'Filter' */}
                        {tagOptions.map((tag, index) => (
                            <div
                                key={index}
                                className={`dropdown-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagChange(tag)}
                            >
                                {tag}
                                {selectedTags.includes(tag) && <span className="checkmark">✔</span>}
                            </div>
                        ))}
                    </div>
                    {/* Faculty and Degree Level sections are hidden */}
                </div>
            </Drawer>
        </div>
    );
}

export default MobileFilterButton;
