

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieList from './Movielistproject/MovieList';
import Addfav from './Movielistproject/Addfav';
import Removefav from './Movielistproject/Removefav';

function App() {
  const [movies, setMovie] = useState([]);
  const [favourites, setfaourites] = useState([]);
  const [search, setsearch] = useState('');

  const getMoviesrequest = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=865d26de`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovie(responseJson.Search);
    }
  };

  useEffect(() => {
    getMoviesrequest(search);
  }, [search]);

  useEffect(() =>{
    const moviefavourites = JSON.parse(localStorage.getItem('favouriteMovies'));
    setfaourites(moviefavourites);
  },[]);
const saveToLocl = (item) => {
  localStorage.setItem('favouriteMovies', JSON.stringify(item))
}

  const addfavourites = (movies) => {
    const newfavourite = [...favourites, movies]
    setfaourites(newfavourite);
    saveToLocl(newfavourite);
    
  };

  const Removefavmovie = (movies) => {
    const newfavourite = favourites.filter((favourites) => favourites.imdbID !== movies.imdbID);
    setfaourites(newfavourite);
    saveToLocl(newfavourite);
  }
  return (
    <>
    <div className='container-fluid movieapp'>
      <div className='row fixed-top'>
        <div className='col'>
          <h1 className='text-light mt-1 ms-2'>Movies</h1>
        </div>
        <div className='col mt-2 '>
          <input type='text' className='form-control w-75' value={search} onChange={(event) => setsearch(event.target.value)} placeholder='search movies..' ></input>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-start mt-5 movielist">
        <MovieList movies={movies} favouriteclick={addfavourites} favouritComponent={Addfav} />
      </div>
      <div className='col'>
        <h1 className='text-light mt-1 ms-2 left-10'>Favourites</h1>
      </div>
    </div>
    <div className="d-flex flex-row justify-content-start mt-5 movielist">
        <MovieList movies={favourites} favouriteclick={Removefavmovie} favouritComponent={Removefav} />
      </div>
    </> 
  );
};

export default App;
