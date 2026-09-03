import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

const App = () => {
  const { aToken } = useContext(AdminContext)
  return aToken ? (
    <main className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
    </main>
  ) : (
    <main>
      <Login />
      <ToastContainer />
    </main>
  )
}

export default App