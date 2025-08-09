import {createBrowserRouter, RouterProvider} from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import ProtectedRoutes from './utils/ProtectedRoutes'
import { 
  LandingPage, 
  AuthRedirect, 
  CompleteProfile,
  MyProfile,
  MyAccount
} from "./pages"
import ProtectedLayout from "./layouts/ProtectedLayout"


const router = createBrowserRouter([
  {
    element: <PublicLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/auth-redirect',
        element: <AuthRedirect/>
      },
    ]
  },
  {
    element: <ProtectedRoutes/>, // protected route element
    children: [
      {
        path: '/complete-profile',
        element: <CompleteProfile/>
      },
      {
        element: <ProtectedLayout/>,
        children: [
          {
            path: `/me`,
            element: <MyProfile/>
          },
          {
            path: "/my/account",
            element: <MyAccount/>
          },
          {
            path: "/my/account/settings",
            element: <></>
          },
          {
            path: "/my/account/edit",
            element: <></>
          },
          {
            path: '/projects',
            element: <></>
          },     
          {
            path: '/share-project',
            element: <></>
          },    
          {
            path: '/inbox',
            element: <></>
          }, 
          {
            path: '/teams',
            element: <></>
          }, 
        ]
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
