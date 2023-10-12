import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { API_KEY, BASE_URL } from '../consts';

const Home = ({getSessionId}) => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const sessionId = getSessionId();
 
  // when the category changes fetch data
  useEffect(()=>{
    let response;
    const fetchMovies = async() => {
      if (category === 'favorite'){
        response = await axios.get(
          `${BASE_URL}/account/1/${category}/movies?api_key=${API_KEY}&session_id=${sessionId}`
        );
       
      }
      else {
        response = await axios.get(
          `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
        );
        
      }
      setMovies(response.data.results);
    }
    fetchMovies()
  },[category]);

  // changing the category in the state
  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => handleCategoryChange('popular')}>Popular</Button>
        <Button onClick={() => handleCategoryChange('now_playing')}>Now Playing</Button>
        <Button onClick={() => handleCategoryChange('favorite')}>My Favorites</Button>
      </ButtonGroup>

      <Grid container spacing={{ xs: 2, md: 4 }}>     
        {movies && movies.map((movie) => (
          <Grid key={movie.id} item xs={6} md={3}>
            <Link to={`/movie/${movie.id}`} state={{ movieDetails: movie}} key={movie.id}>
              <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                      <CardMedia
                          component="img"
                          height="140"
                          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt={movie.title}
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                          {movie.title}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;