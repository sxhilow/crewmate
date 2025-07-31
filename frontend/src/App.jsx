import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LandingPage from "./pages/public/LandingPage"

const router = createBrowserRouter([
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
