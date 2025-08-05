import {createBrowserRouter, RouterProvider} from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import ProtectedRoutes from './utils/ProtectedRoutes'
import { 
  LandingPage, 
  AuthRedirect, 
  CompleteProfile
} from "./pages"
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
        element: <></>,
        children: [
          {
            path: '/dashboard',
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
