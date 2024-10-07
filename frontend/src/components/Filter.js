import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/Filter.css';

function Filter({ onFilterChange }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    // Removed 'Other' from the tag options
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

    const formatTagForFiltering = (tag) => {
        return tag.toLowerCase().replace(/ & /g, '-');
    };

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

    return (
        <div className="filter-container">
            <div className="filter-bubble" onClick={handleBubbleClick} ref={dropdownRef}>
                Filter Events
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="filter-group">
                            <h4>Filter</h4> {/* Changed 'Tags' to 'Filter' */}
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
                        {/* Faculty and Degree Level sections are hidden */}
                    </div>
                )}
            </div>
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
};

export default Filter;
