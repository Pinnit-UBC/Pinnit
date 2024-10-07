import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import leftArrow from '../assets/left.png';
import rightArrow from '../assets/right.png';
import '../styles/MobileTimeline.css';

const MobileTimeline = ({ selectedDate, onDateChange }) => {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const todayDayOfWeek = dayjs().format('dddd');
  const selectedDayOfWeek = dayjs(selectedDate).format('dddd');

  const handleTomorrowClick = () => {
    const nextDay = dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD');
    onDateChange(nextDay);
  };

  const handleYesterdayClick = () => {
    const previousDay = dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD');
    onDateChange(previousDay);
  };

  return (
    <div className="mobile-timeline-container">
      <img src={leftArrow} alt="Previous Day" className="mobile-arrow left-arrow" onClick={handleYesterdayClick} />
      <div className="mobile-timeline-text">
        {selectedDate === todayDate ? (
          <span className="mobile-timeline-today">Today, {todayDayOfWeek}</span>
        ) : (
          <span className="mobile-timeline-day">{selectedDayOfWeek}</span>
        )}
      </div>
      <img src={rightArrow} alt="Next Day" className="mobile-arrow right-arrow" onClick={handleTomorrowClick} />
    </div>
  );
};

MobileTimeline.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default MobileTimeline;
