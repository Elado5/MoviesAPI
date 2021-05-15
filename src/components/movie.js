const Movie = (movie, updateMovie, deleteMovie) => {

    return <div className="movie">
        <p src={movie.poster}></p>
        <h2>{movie.title}</h2>
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
        <p>{movie.publishedDate}</p>
        <button className="remove" onClick={() => deleteMovie()}>Remove Movie</button>
        <button className="update" onClick={() => updateMovie()}>Update Movie</button>
    </div>
    
    }
    
    export default Movie;