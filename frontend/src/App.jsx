
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Landing from './Pages/landing'
import Signin from './Pages/Signin'
import Searchmovies from './Pages/Searchmovies'
import Favourite from './Pages/Favourite'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/signin' element={<Signin />}></Route>
      <Route path='/search' element={<Searchmovies />}></Route>
      <Route path='/favourite' element={<Favourite />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
