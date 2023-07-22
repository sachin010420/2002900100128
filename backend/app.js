const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace these values with your actual credentials received after company registration
const COMPANY_NAME = 'Train Central';
const CLIENT_ID = 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27';
const CLIENT_SECRET = 'XOyolORPayKBOdAN';

// API endpoint for John Doe Railways
const API_BASE_URL = 'https://localhost:3000';

// Endpoint to get train schedules, seat availability, and pricing
app.get('/trains', async (req, res) => {
  try {
    // Get the current time and time after 12 hours
    const currentTime = new Date().toISOString();
    const twelveHoursLater = new Date();
    twelveHoursLater.setHours(twelveHoursLater.getHours() + 12);
    const endTime = twelveHoursLater.toISOString();

    // Fetch train data from the John Doe Railways API
    const response = await axios.get(
      `${API_BASE_URL}/trains?startTime=${currentTime}&endTime=${endTime}`,
      {
        headers: {
          Authorization: `Bearer ${CLIENT_ID}:${CLIENT_SECRET}`,
        },
      }
    );

    // Filter out trains departing in the next 30 minutes
    const filteredTrains = response.data.trains.filter(
      (train) => new Date(train.departureTime) > new Date()
    );

    // Sort the remaining trains based on price, ticket availability, and departure time
    const sortedTrains = filteredTrains.sort((a, b) => {
      if (a.price === b.price) {
        if (a.availableSeats === b.availableSeats) {
          return new Date(a.departureTime) - new Date(b.departureTime);
        }
        return b.availableSeats - a.availableSeats;
      }
      return a.price - b.price;
    });

    // Prepare the API response
    const apiResponse = sortedTrains.map((train) => ({
      trainNumber: train.trainNumber,
      departureTime: train.departureTime,
      availableSeats: train.availableSeats,
      prices: train.prices,
    }));

    // Return the response to the user
    res.json(apiResponse);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
