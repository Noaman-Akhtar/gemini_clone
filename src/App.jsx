import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Main from './components/Main/Main.jsx'

function App() {


  return (
    <>
   <Sidebar/>
   <Main/>
    </>
  )
}

export default App
