import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BookList from './pages/BookListPage';
import EnhancedBookListPage from './pages/EnhancedBookListPage';
import BookDetailPage from './pages/BookDetail/BookDetailPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Routes with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<EnhancedBookListPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="books-table" element={<BookList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;