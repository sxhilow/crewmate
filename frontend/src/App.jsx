import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LandingPage from "./pages/public/LandingPage"
import PublicLayout from "./layouts/PublicLayout"

const router = createBrowserRouter([
  {
    element: <PublicLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/login',
        element: <></>
      },
      {
        path: '/signup',
        element: <></>
      },
      {
        path: '/auth-redirect',
        element: <></>
      }
    ]
  },
  {
    element: <></>, // protected route element
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
