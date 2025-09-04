import React, { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Nav from './components/Nav'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProductPage from './pages/SingleProductPage'
import CategoryProducts from './pages/CategoryProducts'
import { getData } from './context/DataContext'
import ProtectedRoute from './components/ProtectedRoute'



function App() {
  const [location, setLocation] = useState()
   const [openDropDown, setOpenDropDown] = useState(false);
   const {cartItem,setCartItem} = getData();
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      //console.log(lat, lon);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      try {
        const res = await axios.get(url)   // yaha location -> res
        const exactLocation = res.data.address
        setLocation(exactLocation);
        setOpenDropDown(false);  // loaction ka drop dowm bnd karne k liye detect hone k bad  
        //console.log(exactLocation)
      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation();
  }, [])

  // load cart from loacal storage on intial render 
 useEffect(()=>{
   const storedCart = localStorage.getItem('cartItem')
   if(storedCart){
    setCartItem(JSON.parse(storedCart))
   }
 },[])

 //  save cart to local storage whenevr its change 
useEffect(()=>{
  if (cartItem && cartItem.length > 0) {   // ✅ guard lagaya
    localStorage.setItem("cartItem",JSON.stringify(cartItem))
  }
},[cartItem])

  return (
    <BrowserRouter>
      <Nav location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown}/>   {/* location Nav ko pass karna hoga agar dikhana hai */}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/product/:id' element={<SingleProductPage/>}></Route>
        <Route path='/category/:category' element={<CategoryProducts/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route> {/* 👈 spelling fix */}
        <Route path='/cart' element={<Cart location={location} getLocation={getLocation}/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
