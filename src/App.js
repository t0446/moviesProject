import React, { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home';
import axios from 'axios';
import MovieDetails from './components/movie';
import { API_KEY, BASE_URL } from './consts';

const App = () => {
  const [sessionId, setSessionId] = useState('');
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchSessionId();
    }
  },[])
  
  // fetch the session Id by using Request third-party verification
  const fetchSessionId = async() => {
      const token = await axios.get(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
      // navigate to Request third-party verification
      window.open(`https://www.themoviedb.org/authenticate/${token.data.request_token}`);
      let session_id;
      setTimeout(async() => {
        session_id = await axios.get(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}&request_token=${token.data.request_token}`).then((res) => {
            setSessionId(res.data.session_id);
        }).catch(() => {
          alert('please refresh the page and accept third party verification ');
        });       
      }, 5000);
  }
 // send the session id to other components
  const getSessionId = () => {
    return sessionId;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home getSessionId={getSessionId}/>} />
        <Route path="/movie/:id" element={<MovieDetails getSessionId={getSessionId}/>} />
      </Routes>
    </Router>
  );
};

export default App;