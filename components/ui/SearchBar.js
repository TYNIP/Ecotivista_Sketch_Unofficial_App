import React, { useState } from 'react';

const SearchBar = ({ setArticles }) => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title'); 

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build the query string
      const queryString = new URLSearchParams({
        query,
        filter: searchBy, 
        page: '1',        
        limit: '10',     
      }).toString();
  
      // Fetch with query parameters in the URL
      const response = await fetch(`/api/articles/search/articles?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      alert("No se encontraron resultados de la busqueda");
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="relative rounded-full overflow-hidden bg-white shadow-xl w-3/4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center w-full">

        {/* Dropdown */}
        <select
          value={searchBy}
          onChange={handleDropdownChange}
          className="bg-transparent border-none outline-none text-gray-500 font-semibold px-4 py-3 rounded-l-full w-36 text-xs sm:text-sm md:text-base lg:text-lg sm:mb-2 md:mb-0"
        >
          <option value="title">Título</option>
          <option value="description">Descripción</option>
          <option value="tags">Tags</option>
        </select>

        {/* Input */}
        <input
          type="text"
          name="text"
          placeholder="Search..."
          className="bg-transparent outline-none border-none px-8 py-3 w-full font-sans text-lg font-semibold"
          value={query}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <button
            type="submit"
            className="w-14 h-14 rounded-full bg-green-500 group shadow-xl flex items-center justify-center relative overflow-hidden"
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <path
                d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                fill="white"
                fillOpacity="0.01"
              ></path>
              <path
                d="M42.8496 18.7067L21.0628 44.6712"
                stroke="white"
                strokeWidth="3.76603"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                stroke="white"
                strokeWidth="3.76603"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div
              className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"
            ></div>
            <div
              className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"
            ></div>
          </button>
        </div>

      </form>
    </div>
  );
};

export default SearchBar;
