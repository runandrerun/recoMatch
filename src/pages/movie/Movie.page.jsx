import React, {useState, useEffect} from 'react';
import {HeaderContainer, MovieDetailsContainer} from '../../containers';
import {SelectedMovieContext} from '../../context';
import {useLocation} from 'react-router-dom';
import {fetchOMDBMovie} from '../../adapters';

export default function Movie() {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let location = useLocation();
  useEffect(() => {
    fetchOMDBMovie(location.pathname)
    .then(movieData => {
      setLoaded(true);
      setSelectedMovie(movieData);
    });
  }, []);
  return (
    <SelectedMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      <section id="movie-page">
        <HeaderContainer />
        {
          loaded ?
          <MovieDetailsContainer  /> :
          null
        }
      </section>
    </SelectedMovieContext.Provider>
  )
}
