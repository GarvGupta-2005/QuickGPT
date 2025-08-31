/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './Components/Sidebar'

import { Routes, Route, useLocation } from 'react-router-dom'
import ChatBox from './Components/ChatBox'
import Credits from './Pages/Credits'
import Community from './Pages/Community'
import { useState } from 'react'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './Pages/Loading'
import Login from './Pages/Login'
import { useAppContext } from './Context/AppContext'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { user,loadingUser,setLoadingUser } = useAppContext()

  

  if (pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster/>
      {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-custom-dark:invert' onClick={() => setIsMenuOpen(true)} />}

      {user ? (
        <div className='custom-dark:bg-gradient-to-b from-[#242124] to-[#000000] custom-dark:text-white'>
          <div className='flex h-screen w-screen'>
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path='/' element={<ChatBox />}></Route>

              {/* <Route path='/credits' element={<Credits />} /> */}

              <Route path='/community' element={<Community />} />
              <Route path='/loading' element={<Loading />} />

            </Routes>
          </div>
        </div>
      ) : (
        <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
          <Login />
        </div>
      )}



    </>
  )
}

export default App