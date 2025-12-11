import { useState } from 'react'
import './App.css'
import { Route,Routes,Link } from 'react-router-dom'
import Home from './Home.jsx'
import BookList from './BookList.jsx'

function App() {

  return (
   <>
   <h1>App.jsx</h1>
   <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Book List</Link>
        </li>
      </ul>
   </nav>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/books' element={<BookList/>}/>
   </Routes>

   </>
  )
}

export default App
