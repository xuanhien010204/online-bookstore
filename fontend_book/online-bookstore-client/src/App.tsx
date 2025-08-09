import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './pages/BookListPage';
import LoginPage from './pages/Auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;