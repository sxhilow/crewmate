import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LandingPage from "./pages/public/LandingPage"
import PublicLayout from "./layouts/PublicLayout"
import ProtectedRoutes from "./utils/ProtectedRoutes"

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
        element: <></>
      }
    ]
  },
  {
    element: <ProtectedRoutes />, // protected route element
    children: [
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
