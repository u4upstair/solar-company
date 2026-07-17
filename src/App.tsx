import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quote from './pages/Quote';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quote" element={<Quote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
