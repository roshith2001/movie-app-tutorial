import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;    
    return (
        <div className='d-flex flex-wrap justify-content-center'>
            {props.movies && props.movies.map((movie, index) => (
                <div className='image-container m-3'>
                    <img src={movie.Poster} alt='movie' />
                    <div className='overlay d-flex align-items-center justify-content-center'
                        onClick={() => props.handleFavouriteClick(movie)}>
						<FavouriteComponent />
					</div>                  
                </div>
            ))}
        </div>
    );
}

export default MovieList;