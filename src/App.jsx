import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from './Custom-hook/useDebounce.js';
import { updateSearchCount } from './appwrite.jsx';

const App = () => {
  const [searchTerm , setSearchTerm]= useState("");
  const [errorMsg , setErrorMsg] = useState("");
  const [movieList , setMovieList] = useState([]);
  const [isloding , setIsLoding] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm , 2000);
  //debounce the search term to prevent making too many api requests
  //by waiting for the user to stop typing for 500ms

  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method : 'GET',
    headers : {
      accept : 'application/json',
      authorization : `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query = '') =>{
    setIsLoding(true);
    setErrorMsg("");
    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint , API_OPTIONS);  //fetch prebuilt method to make http request
      if(!response.ok) throw new Error("falied to fetch movies");
      const movieData = await response.json();
      console.log(movieData);
      if(movieData.Response === 'False'){
        setErrorMsg(movieData.Error || "falied to fetch movies");
        setMovieList([]);
        return ; 
      }
      setMovieList(movieData.results);
      if(query && movieData.results.length >0){
         updateSearchCount(query , movieData.results[0] );
      }

    } catch (error) {
      console.log(`Error fetching movies : ${error}`);
      setErrorMsg("Error in fetching Movies");
    } finally{
      setIsLoding(false);
    }
  }

  useEffect(() => {
   fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])
  
 return (
    <>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero_img'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll  Enjoy Without Hassle</h1>
           <Search searchTerm={searchTerm}  setSearchTerm= {setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[35px]'>All Movies</h2>
          {
            isloding ? (
           <Spinner/>
            ) : errorMsg ? (
              <p className='text-red-600 text-2xl'>{errorMsg}</p>
            ) : (
              <ul>
                {
                  movieList.map((movie)=>(
                    <MovieCard key={movie.id} movie = {movie}/>
                  ))
                }
              </ul>
            )
            
          }
         
        </section>
       
      </div>
    </>
  )
}

export default App
