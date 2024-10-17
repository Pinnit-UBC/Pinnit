import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/Filter.css';

function Filter({ onFilterChange, onHalloweenClick }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isHalloweenFilterActive, setIsHalloweenFilterActive] = useState(false); // Track Halloween button state

    const tagOptions = ['Culture & Community', 'Academic & Professional', 'Sports & Fitness', 'Arts & Performance', 'Social', 'Health & Wellness', 'Varsity Sports'];
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBubbleClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const formatTagForFiltering = (tag) => tag.toLowerCase().replace(/ & /g, '-');

    const handleTagChange = (tag) => {
        const formattedTag = formatTagForFiltering(tag);
        const updatedTags = selectedTags.includes(formattedTag)
            ? selectedTags.filter((t) => t !== formattedTag)
            : [...selectedTags, formattedTag];
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, [], []); // Empty arrays for faculty and degree levels
    };

    const removeTag = (tag) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, [], []);
    };

    const handleHalloweenClick = async () => {
        setIsHalloweenFilterActive(!isHalloweenFilterActive); // Toggle the state
        if (!isHalloweenFilterActive) {
            await onHalloweenClick(); // Call the new function to fetch Halloween events
        } else {
            onFilterChange(selectedTags, [], []); // Remove Halloween filter and show selected tags
        }
    };

    return (
        <div className="filter-container">
            <div className="filter-bubble" onClick={handleBubbleClick} ref={dropdownRef}>
                <span className="filter-text">Filter Events</span>
                <span className="dropdown-icon">▼</span>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="filter-group">
                            <h4>Filter</h4>
                            {tagOptions.map((tag, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectedTags.includes(formatTagForFiltering(tag)) ? 'selected' : ''}`}
                                    onClick={() => handleTagChange(tag)}
                                >
                                    {tag}
                                    {selectedTags.includes(formatTagForFiltering(tag)) && <span className="checkmark">✔</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button className={`halloween-button ${isHalloweenFilterActive ? 'active' : ''}`} onClick={handleHalloweenClick}>
                View Halloween Events
            </button>
            <div className="selected-options">
                {selectedTags.map((tag, index) => (
                    <span key={index} className="selected-option">
                        {tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} <span className="remove-option" onClick={() => removeTag(tag)}>✖</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onHalloweenClick: PropTypes.func.isRequired, // Add this new prop
};

export default Filter;
