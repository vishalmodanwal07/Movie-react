import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Search = ({searchTerm , setSearchTerm}) => {
  return (
    <div className="search flex">
        <FaSearch className='text-2xl text-amber-100 m-2' />
        <input
        type='text'
        placeholder='Search Through Thousands of  Movie...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
        {searchTerm?<MdCancel className='text-2xl text-white m-2' onClick={()=>{setSearchTerm('')}}/> : null}
        
    </div>
  )
}

export default Search
