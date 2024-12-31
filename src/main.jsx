import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from 'react-router'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Error from './pages/Error.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './pages/Login.jsx'
import Registeration from './pages/Registration.jsx'
import Profile from './pages/Profile.jsx'
import CanceledOrders from './pages/CanceledOrders.jsx'
import Contact from './pages/Contact.jsx'
import { Analytics } from "@vercel/analytics/react"
import { BackgroundBeamsWithCollision } from './components/ui/Background-beams-with-collision.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='product' element={<BackgroundBeamsWithCollision children={<Products/>}/>}/>
            <Route path='product/checkout/:id/:title/:price/:image' element={<BackgroundBeamsWithCollision children={<Checkout/>}/>}/>
            <Route path='register' element={<Registeration/>} />
            <Route path='login' element={<Login/>} />
            <Route path='profile' element={<BackgroundBeamsWithCollision children={<Profile/>}/>} />
            <Route path='canceledorders' element={<CanceledOrders/>} />
            <Route path='contact' element={ <BackgroundBeamsWithCollision children={<Contact/>}/>}/>
            <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
