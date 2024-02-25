import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LandingPage from './LandingPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/editor",
    element: <App/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
