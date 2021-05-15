//react
import { useState, useEffect} from 'react'

//components
import Movie from './components/movie'

//styles
import './App.css';

//import the API config file
import { API } from './api'

const App = () => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    let result = await fetch(`${API.base}/all`, { method: `GET`})
    let data = await result.json()
    setMovies(data)
  }

  const deleteMovieHandler = async (id) => {
    let result = await fetch(`${API.base}/delete/${id}`, { method: `DELETE`})
    let data = await result.json()
    console.log(`delete data =>`, data)

    //טיפול אם ניגשים לזה לפני שניגשים לדף הראשי איכשהו או שאין נתונים
    if (data !== undefined) 
    {
      loadMovies()
    }
  }

  const updateMovieHandler = async (id) => {
    let result = await fetch(`${API.base}/update/${id}`, { method: `PUT`})
    let data = await result.json()
    console.log(`update data =>`, data)

    if (data !== undefined) 
    {
      loadMovies()
    }
  }

  const addMovieHandler = async (id) => {
    let result = await fetch(`${API.base}/movies/add`, { method: `PUT`})
    let data = await result.json()
    console.log(`update data =>`, data)

    if (data !== undefined) 
    {
      loadMovies()
    }
  }

  return (
    <div className="App">
      {
        movies.map(movie => <Movie
          key={movie.id}
          movie={movie}
          updateMovie={updateMovieHandler}
          deleteMovie={deleteMovieHandler}
          ></Movie>)
      }
    </div>
  );
}

export default App;
