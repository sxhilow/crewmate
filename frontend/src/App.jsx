import {createBrowserRouter, RouterProvider} from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import ProtectedRoutes from './utils/ProtectedRoutes'
import { 
  LandingPage, 
  AuthRedirect, 
  CompleteProfile,
  MyProfile,
  EditProfile,
  AccountInfo,
  ProjectsDash,
  AddProject,
  ProjectView,
  Inbox,
  UserProfile
} from "./pages"
import ProtectedLayout from "./layouts/ProtectedLayout"
import MyAccountLayout from "./layouts/MyAccountLayout"
import SearchLayout from "./layouts/SearchLayout"


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
            element: <MyAccountLayout/>,
            children: [
              {
                path: '/my/account',
                element: <EditProfile/>
              },
              {
                path: "/my/account/info",
                element: <AccountInfo/>
              },
              {/* Could have a deactivate account */}
            ]
          },
          {
            element: <SearchLayout/>,
            children: [
              {
                path: '/projects',
                element: <ProjectsDash/>
              },  
               {
                  path: '/inbox',
                  element: <Inbox/>
                }, 
            ]
          },   
          {
            path: '/project/:id',
            element: <ProjectView/>
          },  
          {
            path: '/share-project',
            element: <AddProject/>
          },    
          {
            path: '/:username',
            element: <UserProfile/>
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
