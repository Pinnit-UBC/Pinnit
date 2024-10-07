import React, { useState } from 'react';
import Timeline from './Timeline';
import dayjs from 'dayjs';

const ParentComponent = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <Timeline selectedDate={selectedDate} onDateChange={handleDateChange} />
      {/* Other components that use selectedDate */}
    </div>
  );
};

export default ParentComponent;
