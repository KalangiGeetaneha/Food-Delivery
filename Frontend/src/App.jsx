import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginInPopUp/LoginPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrder from './Pages/MyOrders/MyOrder'

const App = () => {

   const [showLogin,setshowLogin]=useState(false)

  return (
  
   <> 
    { showLogin ?<LoginPopUp  setshowLogin={setshowLogin}/>:<></>}
    <div className='app'>
    <Navbar  setshowLogin={setshowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeorder' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrder/>} />
      
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App