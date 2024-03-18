import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Signup from '../components/Signup.jsx'
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'
import Profile from '../components/Profile.jsx'
import Edit from '../components/Edit.jsx'
import AdminLogin from '../components/AdminLogin.jsx'
import Admin from '../components/Admin.jsx'
import SearchResults from '../components/SearchResults.jsx'
import BookSeats from '../components/BookSeats.jsx'
import PaymentPage from '../components/PaymentPage.jsx'
import Tickets from '../components/Tickets.jsx'
//import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/userEdit",
    element: <Edit />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/searchResults",
    element: <SearchResults />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/bookSeats",
    element: <BookSeats />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/paymentPage",
    element: <PaymentPage />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/tickets",
    element: <Tickets />,
    errorElement: <div>Not Found</div>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
