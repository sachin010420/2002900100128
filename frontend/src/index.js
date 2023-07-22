// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';

// const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API URL

// const AllTrainsPage = () => {
//   const [trains, setTrains] = useState([]);

//   useEffect(() => {
//     fetchTrains();
//   }, []);

//   const fetchTrains = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/trains`);
//       setTrains(response.data);
//     } catch (error) {
//       console.error('Error fetching trains:', error.message);
//     }
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         {trains.map((train) => (
//           <Grid item xs={12} sm={6} md={4} key={train.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Train Name: {train.name}
//                 </Typography>
//                 <Typography variant="body1">Departure Time: {train.departureTime}</Typography>
//                 <Typography variant="body1">Arrival Time: {train.arrivalTime}</Typography>
//                 {/* Display other train details here */}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// const SingleTrainPage = ({ match }) => {
//   const [train, setTrain] = useState(null);
//   const trainId = match.params.id;

//   useEffect(() => {
//     fetchSingleTrain();
//   }, [trainId]);

//   const fetchSingleTrain = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/trains/${trainId}`);
//       setTrain(response.data);
//     } catch (error) {
//       console.error('Error fetching single train:', error.message);
//     }
//   };

//   if (!train) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Train Name: {train.name}
//           </Typography>
//           <Typography variant="body1">Departure Time: {train.departureTime}</Typography>
//           <Typography variant="body1">Arrival Time: {train.arrivalTime}</Typography>
//           {/* Display other detailed train information here */}
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export { AllTrainsPage, SingleTrainPage };


import React from "react";
import axios from "axios";
import { useState } from "react";
import {
    Paper,
    List,
    ListItem,
    Link,
    Button,
    Typography,
} from "@material-ui/core";

const HomePage = () => {
    const [trains, setTrains] = useState([]);

    const getTrains = async () => {
        const response = await axios.get("/trains");
        setTrains(response.data);
    };

    const handleTrainClick = (train) => {
        window.location.href = `/trains/${train.train_number}`;
    };

    return (
        <div>
            <Paper>
                <Typography variant="h1">Train Schedule</Typography>
                <List>
                    {trains.map((train) => (
                        <ListItem key={train.train_number}>
                            <Link href="#" onClick={() => handleTrainClick(train)}>
                                {train.train_number} - {train.name}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

const TrainDetailsPage = ({ train }) => {
    return (
        <Paper>
            <Typography variant="h1">Train Details</Typography>
            <ul>
                <li>Train number: {train.train_number}</li>
                <li>Name: {train.name}</li>
                <li>Departure time: {train.departure_time}</li>
                <li>Arrival time: {train.arrival_time}</li>
                <li>Seat availability: {train.seat_availability}</li>
                <li>Price: {train.price}</li>
            </ul>
        </Paper>
    );
};

export default HomePage;
