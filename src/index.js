import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';  
import Trending from './Trending';
import Movies from './Movies';
import TV from './TV';
import Search from './Search';
import MovieDetail from './components/movie';  // Import your movie detail component

import 'bootstrap/dist/css/bootstrap.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Trending />} />             {/* Home Route */}
      <Route path="/movies" element={<Movies />} />         {/* Movies Route */}
      <Route path="/tv" element={<TV />} />                {/* TV Shows Route */}
      <Route path="/search" element={<Search />} />         {/* Search Route */}
      <Route path="/movie/:movieSlug" element={<MovieDetail />} />  {/* Dynamic Movie Route */}
    </Routes>
  </BrowserRouter>
);