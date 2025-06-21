import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/UserProvider'; // <-- Correct import
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster
        toastOptions={{
          className: 'bg-gray-800 text-white',
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          },}}
          ></Toaster>
    </UserProvider>
  </StrictMode>,
)
