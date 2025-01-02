import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

function Layout() {
  return (
    <div className='w-full flex min-h-screen flex-col dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] overflow-x-hidden '>
        <Navigation/>          
        <Outlet/>
        <Analytics/>
        <Footer/>
    </div>
  )
}

export default Layout
