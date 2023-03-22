import React from 'react';
import { useState, useEffect } from 'react';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourite from './Components/AddFavourite';
import RemoveFavourite from './Components/RemoveFavourite';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourite, setFavourite] = useState([]);

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7c1820d`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourite')
		);

    if(movieFavourites){
		  setFavourite(movieFavourites);
    }
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourite', JSON.stringify(items));
	};

  const addFavourite = (movies) => {
    const newFavourite = [...favourite, movies];
    setFavourite(newFavourite);
    saveToLocalStorage(newFavourite);
  }
  const removeFavourite = (movies) => {
    const newFavouriteList = favourite.filter(
			(favourite) => favourite.imdbID !== movies.imdbID
		);
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }


  return (
    <div className="container-fluid movie-app">
      <div className='row'>
        <MovieListHeading heading="Movies" />
        <SearchBox 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} />
        <MovieList 
          movies={movies}  
          favouriteComponent={AddFavourite}
          handleFavouriteClick={addFavourite}/>
      </div> 
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList 
          movies={favourite} 
          favouriteComponent={RemoveFavourite}
          handleFavouriteClick={removeFavourite}
        />
      </div>     
    </div>
  );
}

export default App;
