import React, {useEffect, useState} from 'react'
import Button from '../../../components/atoms/Button'
import { Github, X } from '../../../assets/icons'
import { fetchUserProfile } from '../../../controllers/user'

const MyProfile = () => {
  const [userData, setUserData] = useState({})
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await fetchUserProfile()       
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

    fetchUserData()
  }, [])


  return (
    loading ? (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
      <div className='max-w-4xl text-neutral-13  mx-auto my-20  flex flex-col justify-center items-center space-y-10'>
      <div className='w-full  mb-10 flex justify-between items-center'>
          <div>
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
          <div>
            <Button to={'/my/account'} className='bg-washed-blue px-4 py-2 rounded-lg text-desktop-h5 font-semibold border border-primary-blue'>
              Edit Profile
            </Button>
          </div>
      </div>
      <div className='w-full'>
        <h2 className='text-desktop-h5 font-bold'>About</h2>
        <div className='w-full bg-washed-blue rounded-md p-5 flex wrap-break-word text-desktop-p'>
          {userData.bio.length > 0 ? (
            <span>
              {userData.bio}
            </span>
          ) : (
            <div>
              <Button to={'/me/edit-profile'} className='underline'>
                Your bio
              </Button>
              <span> goes here. Make it iconic. </span>
            </div>
          )}
        </div>
      </div>
      <div className='w-full space-y-3'>
        <h2 className='text-desktop-h5 font-bold'>My Skills</h2>
        <div className='w-full flex flex-wrap  bg-washed-blue rounded-md p-5  gap-4'>
          {
            skills.length > 0 ? (
              skills.map(({label}) => (
                <div key={label} className='flex justify-center items-center bg-primary-blue/80 px-2 py-1 min-w-18 font-semibold rounded-lg text-washed-purple'>
                  {label}
                </div>
              ))
            ) : (
              <div>
                <Button to={'/me/edit-profile'} className='underline'>
                  Add
                </Button>
                <span> your skills so people know you’re not just good at doom scrolling</span>                
              </div>
            )
          }
          
        </div>
      </div>
      <div className='w-full space-y-3'>
        <h2 className='text-desktop-h5 font-bold'>My Projects</h2>
        
        {

        projects.length > 0 ? (
          projects.map((project) => (
          <div key={project.title} className='w-full bg-washed-blue rounded-md p-5 flex justify-between items-center px-10'>
              <span className='text-desktop-h5 font-bold '>
                {project.title}
              </span>
              <span className='text-primary-blue'>
                {project.projectStage}
              </span>
          </div>
        ))
        ) : (
          <div className='w-full bg-washed-blue rounded-md p-5 '>
            <Button to={'/share-project'} className='underline'>
              Drop 
            </Button>
            <span> your projects its time to squad up</span>                
          </div>
        )      
        
        
        }
        
      </div>
    </div>
    )
  )
}

export default MyProfile