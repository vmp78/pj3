import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {Toaster} from "react-hot-toast"

import Signup from './Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import HomeUser from './HomeUser'
import HomeManager from './HomeManager'
import HomeEmployee from './HomeEmployee'
import HomeGuest from './HomeGuest'

function App() {

  return (
    <BrowserRouter>
    <Routes>     
      <Route path='/' element={<HomeGuest/>}> </Route>
      <Route path='/signup' element={<Signup/>}> </Route>
      <Route path='/login' element={<Login/>}> </Route>
      <Route path='/home-user' element={<HomeUser/>}> </Route>
      <Route path='/home-manager' element={<HomeManager/>}> </Route>
      <Route path='/home-employee' element={<HomeEmployee/>}> </Route>
    </Routes>
    <Toaster />
    </BrowserRouter>
  )
}

export default App
