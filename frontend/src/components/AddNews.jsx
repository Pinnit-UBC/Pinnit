import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../styles/AddEvent.css';

function AddNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    date: dayjs(),
    title: '',
    content: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setOpenDialog(false);

    try {
      const response = await fetch('https://backend-8eis.onrender.com/add-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: dayjs(formData.date).format('YYYY-MM-DD') // Ensure date is in the correct format
        }),
      });

      if (response.ok) {
        setDialogContent('Successfully added news!');
      } else {
        const errorData = await response.json();
        setDialogContent(errorData.message || 'Failed to add news. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setDialogContent('Failed to add news. Please try again.');
    } finally {
      setOpenDialog(true);
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogContent === 'Successfully added news!') {
      navigate('/news');
    }
  };

  return (
    <div className="add-event-container">
      <h1>Add News</h1>
      <form onSubmit={handleSubmit} className="add-event-form">
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formData.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            required
          />
        </LocalizationProvider>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={10}
          required
        />
        <div className="form-buttons">
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submission Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddNews;
