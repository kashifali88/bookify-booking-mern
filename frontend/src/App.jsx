import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/home/Home'
import HotelsList from './pages/hotels_list/HotelsList'
import Hotel from './pages/hotel/Hotel'
import './App.css'
import Login from "./pages/login/Login"



const App = () => {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<HotelsList />} />
      <Route path="/hotel/:id" element={<Hotel />} />
      <Route path="/login" element={<Login />} />
      

    </Routes>
    </BrowserRouter>
  )
}

export default App