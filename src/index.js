import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Trending from './Trending';
import Movies from './Movies';
import TV from './TV';
import Search from './Search';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Trending />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/tv" element={<TV />} />
    <Route path="/search" element={<Search />} />
  </Routes>
</BrowserRouter>
);