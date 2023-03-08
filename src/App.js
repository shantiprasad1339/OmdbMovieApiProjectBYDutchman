import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'


function App() {
  const [movies, setMovie] = useState([]);
  const [favouritMovies, setfavouritemovies] = useState([]);
  const [search, setsearch] = useState('');
  


  //displaying movie from api
  const getMoviesrequest = async (search) => {
    const url = `https://www.omdbapi.com/?s=${search}&apikey=865d26de`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Response);

    if (responseJson.Search) {
      setMovie(responseJson.Search);

    }
  };
  useEffect(() => {
    getMoviesrequest(search);
  }, [search]);

  //setting movie to localstorage






  const addfavourites = (movie) => {
    let newFavouritelist = [...favouritMovies, movie];
    setfavouritemovies(newFavouritelist);
    // saveTolocal(newFavouritelist)
    
  };

  const removefavourites = (movies) => {
    const removedfavourites = favouritMovies.filter((item) => item.imdbID !== movies.imdbID);
    setfavouritemovies(removedfavourites);
    // localStorage.clear('movieApp');
    // saveTolocal(removedfavourites);
  };


  // const saveTolocal = (moviename) => {
  //   localStorage.setItem("movieApp", JSON.stringify(moviename));
  // }
  // useEffect(() => {
  //   const getFavouritemovies = JSON.parse(localStorage.getItem('movieApp'));
  //   setfavouritemovies(getFavouritemovies);
    
  // }, [search]);
  return (
    <>
      <div className=' h-auto w-auto'>
        <div className='flex space-x-8 md:space-x-80 '>
          <div className='  mt-2 bg-black rounded-lg '>
            <h1 className='text-xl font-bold rounded-lg px-2 sm:text-3xl text-white border border-white'>Dutchman-Movies</h1>
          </div>
          <div className=' mt-2  '>
            <input type='text' className='pl-2 w-40 rounded border-2 border-black ' value={search} onChange={(event) => setsearch(event.target.value)} placeholder='search movies..' ></input>
          </div>
        </div>
        {/* <div className='max-w-screen grid grid-rows-6 grid-flow-col justify-center gap-2 sm:flex sm:space-x-2 movie-app'> */}
        <div className=' py-5 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  md:gap-x-5 xmd:grid-cols-5 gap-x-3 movie-app'>
          {movies.map((movie, index) => {
            return (
              <div className=' mx-auto mb-1 flex justify-center  movie-app'>
                <ul className='  '> <img src={movie.Poster} alt="movie" className='md:mr-40 md:w-52 rounded-xl h-72 md:h-96 border-2 border-white     transition ease-in delay-150  hover:-translate-y-1 hover:scale-110  duration-700 hover:rounded-xl' />

                  <div className='-mt-9'> <i className="flex text-2xl cursor-pointer text-white fa-solid fa-heart-circle-plus justify-center hover:text-red-500 relative" onClick={() => addfavourites(movie)}></i></div>
                  <div className='mt-[5px] flex justify-center '>

                    <h1 className=' sm:text-xs md:text-sm sm:w-[180px] text-center md:mr-8 text-xs font-bold mt-1 border border-white  rounded bg-black text-white   px-2 mb-2 '>{movie.Title}</h1>
                  </div>

                </ul>
              </div>);
          })}
        </div>
         <div className='  mt-2  rounded-lg flex justify-center'>
          <h1 className='text-xl bg-black font-bold rounded-lg px-2 sm:text-3xl text-white border border-white'>Favoutites</h1>
        </div>
   <div className=' py-5 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  md:gap-x-5 xmd:grid-cols-5 gap-x-3 movie-app'>
          {favouritMovies.map((movie, index) => {
            return (
              <div className='max-w-[1200px] mx-auto mb-1 flex justify-center  movie-app'>
                <ul className='  '> <img src={movie.Poster} alt="movie" className='sm:w-52 rounded-xl h-72 sm:h-96 border-2 border-white hover:scale-120   hover:duration-100 ' />

                  <div className='-mt-9'> <i className="flex text-2xl cursor-pointer text-red-500 fa-solid fa-heart-circle-minus justify-center  " onClick={() => removefavourites(movie)}></i></div>
                  <div className='-mt-[0px] flex justify-center  ' >

                    <h1 className=' sm:text-sm w-auto text-xs font-bold mt-1 border border-white  rounded bg-black text-white   px-2 mb-2 '>{movie.Title}</h1>
                  </div>

                </ul>
              </div>);
          })}
        </div>

              </div>
    </>
  );
};

export default App;
