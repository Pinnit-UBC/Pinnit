import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SubscriptionForm.css';

const SubscriptionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subscribe) {
      try {
        const response = await axios.post('https://backend-8eis.onrender.com/subscribe', {
          name,
          email,
        });

        if (response.status === 200) {
          alert('Subscribed successfully!');
        } else {
          alert('Failed to subscribe.');
          console.error('Response:', response);
        }
      } catch (error) {
        console.error('Error subscribing:', error.response || error.message);
        alert('There was an error subscribing. Please try again later.');
      }
    } else {
      alert('Please agree to receive UBC event updates.');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Box className="subscription-form-container">
      <Button variant="contained" className="back-button" onClick={handleBackClick}>
        Back
      </Button>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              style={{ color: 'lightgrey' }} // Custom checkbox color
            />
          }
          label="I want to receive UBC event updates"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Subscribe
        </Button>
      </form>
    </Box>
  );
};

export default SubscriptionForm;
