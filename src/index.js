import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TV';
import Search from './pages/Search';
import MovieDetail from './components/movie';
import TVShowDetail from './components/show';
import Header from './components/header';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TV />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/tv/:id" element={<TVShowDetail />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);