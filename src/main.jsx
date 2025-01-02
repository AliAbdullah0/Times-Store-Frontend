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
import MyCartPage from './components/ui/Cart.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { BackgroundBeamsWithCollision } from './components/ui/Background-beams-with-collision.jsx'
import WomenWatches from './pages/WomensWatches'
import { ProductProvider } from './ProductContext.jsx'
import { WomensContextProvider } from './WomensWatchesContext.jsx'
import { ProfileContextProvider } from './ProfileContext.jsx'
import store from './store/Store.js'
import {Provider} from 'react-redux'
import CartCheckout from './pages/CartCheckout.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <SpeedInsights/>
    <BrowserRouter>
    <ProfileContextProvider>
    <WomensContextProvider>
    <ProductProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='product/men' element={<Products/>}/>
            <Route path='product/women' element={<WomenWatches/>}/>
            <Route path='product/checkout/:id/:title/:price/:image' element={<BackgroundBeamsWithCollision children={<Checkout/>}/>}/>
            <Route path='register' element={<Registeration/>} />
            <Route path='login' element={<Login/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='canceledorders' element={<CanceledOrders/>} />
            <Route path='contact' element={ <Contact/>}/>
            <Route path='cart' element={ <MyCartPage/>}/>
            <Route path='cart/cartcheckout' element={<CartCheckout/>}/>
            <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
      </ProductProvider>
      </WomensContextProvider>
      </ProfileContextProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>
)
