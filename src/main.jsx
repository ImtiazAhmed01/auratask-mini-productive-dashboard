import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/login'
import Register from './Components/Register/Register'
import Root from './Components/Root'
import AuthProvider from './Components/Provider/AuthProvider'
import Dashboard from './Components/Dashboard/Dashboard'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Dashboard></Dashboard> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },

    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
