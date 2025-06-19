import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'

const App = () => {
  const [searchTerm , setSearchTerm]= useState("");
  const [errorMsg , setErrorMsg] = useState("");
 



  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method : 'GET',
    headers : {
      accept : 'application/json',
      authorization : `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async () =>{
    try {
      const endpoint =` ${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint , API_OPTIONS);  //fetch prebuilt method to make http request
      if(!response.ok) throw new Error("falied to fetch movies");
      const movieData = await response.json();
      // console.log(movieData);
      if(movieData.Response === 'False'){
        setErrorMsg(movieData.Error || "falied to fetch movies");
      }
    } catch (error) {
      console.log(`Error fetching movies : ${error}`);
      setErrorMsg("Error in fetching Movies");
    }
  }

  useEffect(() => {
   fetchMovies();
  }, [])
  
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
          <h2>All Movies</h2>
          {errorMsg && <p className='text-red-600'>{errorMsg}</p>}
        </section>
       
      </div>
    </>
  )
}

export default App
