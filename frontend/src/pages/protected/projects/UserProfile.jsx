import React, {useState, useEffect} from 'react'
import { fetchUserByUsername } from '../../../controllers/user'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components'
import { Github, X } from '../../../assets/icons'

const UserProfile = () => {

    const {username} = useParams()

    const [userData, setUserData] = useState({})
    const [skills, setSkills] = useState([])
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    
    
    useEffect(() => {
        const fetchUser = async () => {
        setLoading(true)
        try {
            const response = await fetchUserByUsername(username)       
            setUserData(response.user)       
            setSkills(response.skills) 
            setProjects(response.project)
        } catch (error) {
            console.error(error)
            setError(error.response.data.msg)
        }finally{
            setLoading(false)
        }
        }

        fetchUser()
    }, [])


  return (
    loading ? (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
      <div className='max-w-4xl text-neutral-13  mx-auto my-20  flex flex-col justify-center items-center space-y-10'>
      <div className='w-full  mb-10 flex justify-between items-center'>
          
            <div className='flex flex-col -space-y-4'>
            <div className='flex justify-center items-center gap-4 h-full'>
              <span className='text-desktop-h3 font-bold'>{userData.name}</span>
              <div className='flex justify-center items-center gap-2'>
                
                {
                  userData.github_url && (
                    <Button to={userData.github_url}>
                      <img src={Github} alt="Github" className='w-6'/>
                    </Button>
                  )
                }

                {
                  userData.x_url && (
                    <Button to={userData.x_url}>
                      <img src={X} alt="Twitter" className='w-6' />
                    </Button>
                  )
                }
                
              </div>
            </div>
            <span className='text-neutral-9'>@{userData.username}</span>
          </div>
          
          
      </div>
      <div className='w-full'>
        <h2 className='text-desktop-h5 font-bold'>About</h2>
        <div className='w-full border bg-washed-blue/20 rounded-lg p-5 flex wrap-break-word text-desktop-p'>
          {userData.bio?.length > 0 ? (
            <span>
              {userData.bio}
            </span>
          ) : (
            <div>           
              <span> User dosen't have a bio. </span>
            </div>
          )}
        </div>
      </div>
      <div className='w-full space-y-3'>
        <h2 className='text-desktop-h5 font-bold'>Skills</h2>
        <div className='w-full flex flex-wrap  border bg-washed-blue/20 rounded-lg p-5  gap-4'>
          {
            skills.length > 0 ? (
              skills.map(({label}) => (
                <div key={label} className='flex justify-center items-center bg-primary-blue px-2 py-1 min-w-18 font-semibold rounded-lg text-white'>
                  {label}
                </div>
              ))
            ) : (
              <div>
                <span> User Hasn't listed any skills</span>                
              </div>
            )
          }
          
        </div>
      </div>
      <div className='w-full space-y-3'>
        <h2 className='text-desktop-h5 font-bold'>Projects</h2>
        
        {

        projects.length > 0 ? (
          projects.map((project) => (
          <div key={project.title} className='w-full border bg-washed-blue/20 rounded-lg p-5 flex justify-between items-center px-10'>
              <span className='text-desktop-h5 font-bold '>
                {project.title}
              </span>
              <span className='text-primary-blue'>
                {project.projectStage}
              </span>
          </div>
        ))
        ) : (
          <div className='w-full border bg-washed-blue/20 rounded-lg p-5 '>
            <span> User hasn't shared any projects</span>                
          </div>
        )             
        
        }
        
      </div>
    </div>
    )
  )
}

export default UserProfile