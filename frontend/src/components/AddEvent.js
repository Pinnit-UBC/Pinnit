import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import SimpleMap from './SimpleMap';
import dayjs from 'dayjs';
import '../styles/AddEvent.css';

const tagOptions = [
  { value: 'culture-community', label: 'Culture & Community' },
  { value: 'academic-professional', label: 'Academic & Professional' },
  { value: 'sports-fitness', label: 'Sports & Fitness' },
  { value: 'arts-performance', label: 'Arts & Performance' },
  { value: 'social', label: 'Social' },
  { value: 'varsity-sports', label: 'Varsity Sports' },
  { value: 'health-wellness', label: 'Health & Wellness' },
  { value: 'other', label: 'Other' }
];

const facultyOptions = [
  { value: 'applied-science', label: 'Applied Science' },
  { value: 'arts', label: 'Arts' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'economics', label: 'Economics' },
  { value: 'forestry', label: 'Forestry' },
  { value: 'kinesiology', label: 'Kinesiology' },
  { value: 'land-food-systems', label: 'Land & Food Systems' },
  { value: 'law', label: 'Law' },
  { value: 'science', label: 'Science' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: 'None' }
];

const degreeLevelOptions = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'none', label: 'None' }
];

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    pass_key: '',
    event_date: '',
    event_title: '',
    host_organization: '',
    start_time: '',
    end_time: '',
    location: '',
    activity_description: '',
    registration_status: '',
    reference_link: '',
    tags: [],
    faculty: [],
    degree_level: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('AddEvent component mounted');
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleMapClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleCheckboxChange = (e) => {
    setIsOnlineEvent(e.target.checked);
  };

  const handleTagChange = (selectedOptions) => {
    setFormData({ ...formData, tags: selectedOptions });
  };

  const handleFacultyChange = (selectedOptions) => {
    setFormData({ ...formData, faculty: selectedOptions });
  };

  const handleDegreeLevelChange = (selectedOptions) => {
    setFormData({ ...formData, degree_level: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting event form...');
    if (isSubmitting) return;

    setIsSubmitting(true);
    setOpenDialog(false);

    if (!selectedFile) {
      setDialogContent('Please attach a file before submitting.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }
    if (!isOnlineEvent && !markerPosition) {
      setDialogContent('Please pin a location on the map before submitting.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }

    const verifyKeyResponse = await fetch('https://backend-8eis.onrender.com/verify-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: formData.user_id, pass_key: formData.pass_key }),
    });

    const verifyKeyData = await verifyKeyResponse.json();

    if (!verifyKeyData.valid) {
      setDialogContent('Invalid Pass Key. Please try again.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'tags' || key === 'faculty' || key === 'degree_level') {
        formDataToSend.append(key, JSON.stringify(formData[key].map(option => option.value)));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    formDataToSend.append('image', selectedFile);

    if (!isOnlineEvent) {
      formDataToSend.append('latitude', markerPosition.lat);
      formDataToSend.append('longitude', markerPosition.lng);
    } else {
      formDataToSend.append('latitude', null);
      formDataToSend.append('longitude', null);
    }

    try {
      const response = await fetch('https://backend-8eis.onrender.com/add-event', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setDialogContent('Successfully added event!');
      } else {
        setDialogContent('Event not added. Please fill out the required fields and if issue persists please call/text 778-318-9661 or email richardluo73@gmail.com');
      }
    } catch (error) {
      console.error('Error:', error);
      setDialogContent('Event not added. Please fill out the required fields and if issue persists please call/text 778-318-9661 or email richardluo73@gmail.com');
    } finally {
      setOpenDialog(true);
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    console.log('Navigating back to the home page...');
    const today = dayjs().format('YYYY-MM-DD');
    navigate(`/?date=${today}`);
    window.scrollTo(0, 0); // Ensure the page scrolls to the top
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogContent === 'Successfully added event!') {
      navigate('/'); // Navigate to the homepage or a success page if the event is successfully added
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="add-event-container">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className="add-event-form">
        <TextField
          label="User ID"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <TextField
          label="Pass Key"
          name="pass_key"
          value={formData.pass_key}
          onChange={handleChange}
          required
        />
        <TextField
          label="Event Date"
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Event Title"
          name="event_title"
          value={formData.event_title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Host or Organization"
          name="host_organization"
          value={formData.host_organization}
          onChange={handleChange}
          required
        />
        <TextField
          label="Start Time"
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Time"
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          label="Activity Description"
          name="activity_description"
          value={formData.activity_description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <TextField
          label="Registration Status"
          name="registration_status"
          value={formData.registration_status}
          onChange={handleChange}
          required
        />
        <TextField
          label="Reference Link"
          name="reference_link"
          value={formData.reference_link}
          onChange={handleChange}
        />

        <label>Select Tags</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTagChange}
          styles={customStyles}
        />

        <label>Select Faculty</label>
        <Select
          isMulti
          name="faculty"
          options={facultyOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleFacultyChange}
          styles={customStyles}
        />

        <label>Select Degree Level</label>
        <Select
          isMulti
          name="degree_level"
          options={degreeLevelOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleDegreeLevelChange}
          styles={customStyles}
        />

        <div className="upload-section">
          <label>Upload event image</label>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              required={!selectedFile}
            />
          </Button>
        </div>
        {selectedFile && (
          <div className="file-details">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="file-preview" />
            <div className="file-name">{selectedFile.name}</div>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteFile}
            >
              Delete
            </Button>
          </div>
        )}

        <label>Select event location</label>
        <FormControlLabel
          control={<Checkbox checked={isOnlineEvent} onChange={handleCheckboxChange} />}
          label="The event is online"
        />
        {!isOnlineEvent && (
          <div className="map-container">
            <SimpleMap markerPosition={markerPosition} handleMapClick={handleMapClick} />
          </div>
        )}

        <div className="form-buttons">
          <Button variant="outlined" color="secondary" onClick={handleBackClick}>
            Back
          </Button>
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

export default AddEvent;
