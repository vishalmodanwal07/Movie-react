import { useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'

const App = () => {
  const [searchTerm , setSearchTerm]= useState("");
 return (
    <>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero_img'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll  Enjoy Without Hassle</h1>
        </header>
        <Search searchTerm={searchTerm}  setSearchTerm= {setSearchTerm}/>
      </div>
    </>
  )
}

export default App
