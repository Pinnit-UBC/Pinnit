// DatePickerComponent.js
import React, { useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import '../styles/DatePickerComponent.css';

export default function DatePickerComponent({ selectedDate, setSelectedDate }) {
  const inputRef = useRef(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue.format('YYYY-MM-DD'));
  };

  const handleInputChange = (event) => {
    let input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters

    // Ensure only 8 characters
    if (input.length > 8) {
      // Ignore any additional input after the year is fully entered
      input = input.slice(0, 8);
    }

    // Format the input
    let formattedDate = '';
    if (input.length <= 2) {
      formattedDate = input;
    } else if (input.length <= 4) {
      formattedDate = `${input.slice(0, 2)}/${input.slice(2)}`;
    } else {
      formattedDate = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`;
    }

    event.target.value = formattedDate;

    // Update the selected date state if valid
    if (input.length === 8) {
      const date = dayjs(`${input.slice(4, 8)}-${input.slice(2, 4)}-${input.slice(0, 2)}`);
      setSelectedDate(date.format('YYYY-MM-DD'));

      // Remove focus from the input field
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }, 0);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="date-picker-container" sx={{ width: '100%' }}>
        <DatePicker
          label="Search by date"
          value={dayjs(selectedDate)}
          onChange={handleDateChange}
          PopperProps={{
            sx: {
              '& .MuiPaper-root': {
                backgroundColor: '#ffffff', // Set background color to white
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={inputRef}
              onChange={(e) => {
                handleInputChange(e);
                params.inputProps.onChange(e);
              }}
              inputProps={{
                ...params.inputProps,
                maxLength: 10, // Limit the input length to 10 characters including the slashes
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
