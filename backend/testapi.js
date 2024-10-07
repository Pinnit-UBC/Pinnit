const axios = require('axios');

// Function to add an event
async function addEvent() {
    const url = 'http://localhost:3001/add-event';
    const eventData = {
        event_id: 2,
        event_name: "Tech Talk on Web Development",
        start_time: "15:00",
        end_time: "17:00",
        location: "Tech Hub 101",
        club: "Web Dev Club",
        bio: "An in-depth talk on modern web development practices.",
        reference_link: "www.webdevclub.com",
        image_url: "https://instagram.fyvr1-1.fna.fbcdn.net/v/t51.2885-15/21984643_995308220608235_7854693412774084608_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fyvr1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=WZP0jekEo1IQ7kNvgEWWmwt&edm=AGenrX8BAAAA&ccb=7-5&oh=00_AYC8trUokSFDm0T2POPnrtAxbUjbg96rw_lFWWHoYqRNtg&oe=66491A2D&_nc_sid=ed990e"
    };

    try {
        const response = await axios.post(url, eventData);
        console.log('Event Added:', response.data);
    } catch (error) {
        console.error('Error adding event:', error);
    }
}

// Function to get all events
async function getEvents() {
    const url = 'http://localhost:3001/events';

    try {
        const response = await axios.get(url);
        console.log('All Events:', response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the functions to test
addEvent().then(() => getEvents());
