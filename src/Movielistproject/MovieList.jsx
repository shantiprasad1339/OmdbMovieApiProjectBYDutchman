import React from 'react'

function MovieList(props) {
  const FavouritComponent = props.favouritComponent;
  return (
   <>
  
    {props.movies.map((movie, index)=>
    

   <div className='  m-3 d-flex flex-row movieli'>
      <img src={movie.Poster} alt="movie" />  
      <div  onClick={()=> props.favouriteclick(movie)} className=' overlay d-flex align-item-center justify-content-center'>
        <FavouritComponent/>
      </div>
    </div>
    
    )}
  
   </>
  )
}

export default MovieList;