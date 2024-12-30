import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function Layout() {
  return (
    <div className='w-full flex flex-col overflow-x-hidden '>
        <Navigation/>          
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout
