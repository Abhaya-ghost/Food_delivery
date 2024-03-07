import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectRoute from './protect/ProtectRoute'
import VerifyOtp from './pages/VerifyOtp'
import AddFood from './admin/AddFood'
import Menu from './pages/Menu'
import FoodPage from './pages/FoodPage'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Order from './pages/Order'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import MyOrder from './pages/MyOrder'
import AllOrder from './admin/AllOrder'
import ScrollTop from './components/ScrollTop'

function App() {
  const stripePromise = loadStripe('pk_test_51Ong5uSDAh0vpLDkEIozsCRtUXUinCpFt5yV10RCYT1wSmWSQhpPWesdwI1i3KJz9uoomQXt3ZnVitzw2m4gzTck00Yy8Oktdx')


  return (
    <>
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verifyOtp' element={<ProtectRoute><VerifyOtp /></ProtectRoute>} />
        <Route path='/addfood' element={<ProtectRoute><AddFood /></ProtectRoute>} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu/:id' element={<FoodPage />} />
        <Route path='/profile' element={<ProtectRoute><Profile /></ProtectRoute>} />
        <Route path='/cart' element={<ProtectRoute><Cart /></ProtectRoute>} />
        <Route path='/success' element={<ProtectRoute><Success /></ProtectRoute>} />
        <Route path='/cancel' element={<ProtectRoute><Cancel /></ProtectRoute>} />
        <Route path='/myOrder' element={<ProtectRoute><MyOrder /></ProtectRoute>} />
        <Route path='/allOrder' element={<ProtectRoute><AllOrder /></ProtectRoute>} />
        <Route path='/order' element={
          <ProtectRoute>
            <Elements stripe={stripePromise}>
              <Order />
            </Elements>
          </ProtectRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
