import { useState } from 'react'
import './App.css'
import RoutherConfig from './config/RoutherConfig'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Navbar />
      <RoutherConfig />
      <ToastContainer position='top-right' autoClose={2000} />
    </div>
  )
}

export default App
