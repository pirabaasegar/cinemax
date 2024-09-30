import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import Trending from './Trending';
import Movies from './Movies';
import TV from './TV';
import Search from './Search';
import MovieDetail from './components/movie';
import TVShowDetail from './components/show';
import Header from './components/header';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TV />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/tv/:id" element={<TVShowDetail />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);