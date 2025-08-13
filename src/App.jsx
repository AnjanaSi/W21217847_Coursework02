import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Registration from './components/auth/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './components/auth/Login';
import { AuthProvider } from './components/auth/AuthProvider';
import NavBar from './components/layout/NavBar';
import BookListing from './components/book/BookListing';
import Admin from './components/admin/Admin';
import AuthorListing from './components/author/AuthorListing';
import CategoryListing from './components/genre/GenreListing';
import FindLoan from './components/loan/FindLoan';
import ExistingBooks from './components/book/ExistingBooks';
import ExistingGenres from './components/genre/ExistingGenres';
import ExistingAuthors from './components/author/ExistingAuthors';
import ExistingLoans from './components/loan/ExistingLoans';
import AddBook from './components/book/AddBook';
import EditBook from './components/book/EditBook';
import AddAuthor from './components/author/AddAuthor';
import EditAuthor from './components/author/EditAuthor';
import AddGenre from './components/genre/AddGenre';
import EditGenre from './components/genre/EditGenre';
import AddLoan from './components/loan/AddLoan';
import EditLoan from './components/loan/EditLoan';
function App() {
  
  return (
    <AuthProvider>
      <main>
        <BrowserRouter>
          <NavBar/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/all-books" element={<BookListing />} />
          <Route path="/existing-books" element={<ExistingBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:bookId" element={<EditBook />} />

          <Route path="/all-authors" element={<AuthorListing />} />
          <Route path="/existing-authors" element={<ExistingAuthors />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/edit-author/:authorId" element={<EditAuthor />} />

          <Route path="/all-genres" element={<CategoryListing />} />
          <Route path="/existing-genres" element={<ExistingGenres />} />
          <Route path="/add-genre" element={<AddGenre />} />
          <Route path="/edit-genre/:genreId" element={<EditGenre />} />

          <Route path="/find-loan" element={<FindLoan />} />
          <Route path="/existing-loans" element={<ExistingLoans />} />
          <Route path="/add-loan" element={<AddLoan />} />
          <Route path="/edit-loan/:id" element={<EditLoan />} />
          </Routes>
        </BrowserRouter>
      </main>
      
    </AuthProvider>
      
    
  )
}

export default App
