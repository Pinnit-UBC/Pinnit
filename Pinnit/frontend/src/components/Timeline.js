import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Timeline.css';
import dayjs from 'dayjs';

const Timeline = ({ selectedDate, onDateChange }) => {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const todayDayOfWeek = dayjs().format('dddd');
  const selectedDayOfWeek = dayjs(selectedDate).format('dddd');
  const tomorrow = dayjs(selectedDate).add(1, 'day').format('dddd');
  const yesterday = dayjs(selectedDate).subtract(1, 'day').format('dddd');

  const handleTomorrowClick = () => {
    const nextDay = dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD');
    onDateChange(nextDay);
  };

  const handleYesterdayClick = () => {
    const previousDay = dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD');
    onDateChange(previousDay);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-dot-container">
        <div className={`timeline-text previous-day ${selectedDayOfWeek === yesterday ? 'selected' : ''}`}>{yesterday}</div>
        <div className="timeline-dot hollow clickable" onClick={handleYesterdayClick} style={{ marginLeft: '0%' }}></div>
      </div>
      <div className="timeline-line" style={{ marginLeft: '7px', marginRight: '14px' }}></div>
      <div className={`timeline-dot hollow clickable ${selectedDayOfWeek === todayDayOfWeek ? 'selected' : ''}`} style={{ marginLeft: '33%' }}></div>
      <div className={`timeline-text ${selectedDate === todayDate ? 'today' : 'middle-day'}`} style={{ left: '34%' }}>
        {selectedDate === todayDate ? (
          <span className="timeline-today">Today, {todayDayOfWeek}</span>
        ) : (
          <span className={`timeline-day ${selectedDayOfWeek === todayDayOfWeek ? 'selected' : ''}`}>{selectedDayOfWeek}</span>
        )}
      </div>
      <div className={`timeline-dot hollow clickable ${selectedDayOfWeek === tomorrow ? 'selected' : ''}`} style={{ marginLeft: '48%' }} onClick={handleTomorrowClick}></div>
      <div className={`timeline-text tomorrow ${selectedDayOfWeek === tomorrow ? 'selected' : ''}`} style={{ left: '83%' }}>
        <span className={`timeline-tomorrow-day ${selectedDayOfWeek === tomorrow ? 'selected' : ''}`}>{tomorrow}</span>
      </div>
      <div className="timeline-line" style={{ marginLeft: '14px', marginRight: '7px' }}></div>
      <div className="timeline-arrow" style={{ marginLeft: 'auto' }}></div>
    </div>
  );
};

Timeline.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default Timeline;
