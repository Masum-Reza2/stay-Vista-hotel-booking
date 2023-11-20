import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashBoard from '../pages/DashBoard/DashBoard'
import AddRoom from '../pages/DashBoard/Pages/AddRoom'
import MyListings from '../pages/DashBoard/Pages/MyListings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id', element: <PrivateRoute><RoomDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:8000/roomsByid/${params.id}`)
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: 'dashboard', element: <PrivateRoute><DashBoard /></PrivateRoute>,
    children: [
      { path: 'addRoom', element: <AddRoom /> },
      { path: 'myListings', element: < MyListings /> }
    ]
  }
])
