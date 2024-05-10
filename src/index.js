import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Trending from './Trending';
import Movies from './Movies';
import TV from './TV';
import Search from './Search';
import MovieDetail from './components/movie';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TV />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:movieName" element={<MovieDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);