import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

function Layout() {
  return (
    <div className='w-full flex min-h-screen flex-col bg-black overflow-x-hidden '>
        <Navigation/>          
        <Outlet/>
        <Analytics/>
        <Footer/>
    </div>
  )
}

export default Layout
