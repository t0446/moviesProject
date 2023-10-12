import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography"; 
import Button from '@mui/material/Button';
import { API_KEY, BASE_URL } from '../consts';

const MovieDetails = ({getSessionId}) => {
  const location = useLocation();
  const {movieDetails} = location.state;

  const sessionId = getSessionId();

  const handleFavorite = async () => {
    try {
        // Add to favorites
        await axios.post(`${BASE_URL}/account/1/favorite?api_key=${API_KEY}&session_id=${sessionId}`, {
          media_type: 'movie',
          media_id: movieDetails && movieDetails.id,
          favorite: true,
          api_key: API_KEY,
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div> 
      <div style={{ textAlign: "center" }}> 
          <h2>Movie Details</h2> 
      </div>
      {movieDetails &&
      <center> 
          <Box sx={{ maxWidth: 800 }}> 
              <Typography variant="h5" gutterBottom> 
                  title: {movieDetails.title} 
              </Typography> 
              <Typography variant="h6" gutterBottom> 
                  popularity: {movieDetails.popularity} 
              </Typography> 
              <Typography variant="subtitle1" gutterBottom> 
                  release date: {movieDetails.release_date}
              </Typography> 
              <Typography variant="body1" gutterBottom> 
              overview : {movieDetails.overview}
              </Typography> 
              <Button onClick={handleFavorite}> 
                  Add to Favorites 
              </Button> 
          </Box> 
      </center> }
    </div> 
  );
};

export default MovieDetails;