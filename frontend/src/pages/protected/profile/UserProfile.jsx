import React, {useState, useEffect} from 'react'
import { fetchUserByUsername } from '../../../controllers/user'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components'
import { Github, X } from '../../../assets/icons'
import { Link } from 'react-router-dom'

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

    if (loading) {
        return (
          <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>
            Loading...
          </div>
        )
      }
    
    if (error) {
      return (
        <div className='w-full h-screen flex flex-col justify-center items-center text-center'>
          <h2 className='text-desktop-h3 font-bold mb-4'>404</h2>
          <p className='text-neutral-10 mb-6'>{error}</p>
          <Link
            to='/projects'
            className='px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition'
          >
            Back to Projects
          </Link>
        </div>
      )
    }


  return (
      loading ? (
        <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
      ) : (
        <div className='max-w-4xl text-neutral-13  mx-auto my-10 md:my-20  flex flex-col justify-center items-center space-y-10 px-4'>
          <div className='w-full  mb-10 flex justify-between items-center'>
  
            <div className='flex flex-col justify-start items-start space-y-2'>
              <div className='flex justify-center items-baseline gap-4 h-full'>
  
                  <div className='flex flex-col -space-y-3'>
                    <span className='text-desktop-h4 font-bold'>{userData.name}</span>
                    <span className='text-neutral-9'>@{userData.username}</span>
                  </div>
  
                  <div className='flex justify-center items-center gap-2'>
                    
                    {
                      userData.github_url && (
                        <Button to={userData.github_url} className='cursor-pointer'>
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
  
                <div className='flex flex-wrap gap-2'>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                    <svg className='w-4 h-4 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {userData.campus}
                  </span>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                    <svg className='w-4 h-4 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Year {userData.year}
                  </span>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                    <svg className='w-4 h-4 text-purple-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                      {userData.program}
                  </span>
                </div>
            </div>
        </div>
        <div className='w-full'>
          <h2 className='text-xl text-gray-900 font-semibold'>About</h2>
          <div className='w-full border border-neutral-5 rounded-lg p-6 flex wrap-break-word text-desktop-p shadow-sm'>
            {userData.bio?.length > 0 ? (
              <span className='text-neutral-9 leading-relaxed'>
                {userData.bio}
              </span>
            ) : (
              <div className=''>
                <Button to={'/my/account'} className='text-blue-600 hover:underline font-medium'>
                  Your bio
                </Button>
                <span className='text-gray-700'> goes here. Make it iconic. </span>
              </div>
            )}
          </div>
        </div>
        <div className='w-full leading-relaxed'>
          <h2 className='text-xl text-gray-900 font-semibold'>Skills</h2>
          <div className='w-full flex flex-wrap border border-neutral-5 rounded-lg shadow-sm p-6 gap-2'>
            {
              skills.length > 0 ? (
                skills.map(({label}) => (
                  <div key={label} className='px-4 py-2 bg-blue-50 text-primary-blue font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'>
                    {label}
                  </div>
                ))
              ) : (
                <div className=''>
                  <Button to={'/my/account'} className='text-blue-600 hover:underline font-medium'>
                    Add
                  </Button>
                  <span className='text-gray-700'> your skills so people know you’re not just good at doom scrolling</span>                
                </div>
              )
            }
            
          </div>
        </div>
        <div className='w-full'>
          <h2 className='text-xl font-bold text-gray-900 mb-3'>Projects</h2>
          <div className='space-y-4'>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                    <div className='flex-1'>
                      <a href={`/project/${project.id}`} className='text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors'>
                        {project.title}
                      </a>
                      <p className='text-gray-600 mt-1'>{project.tagline}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      project.stage === 'Complete' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {project.stage}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='border border-neutral-5 rounded-lg shadow-sm p-6'>
                <p className='text-gray-700'>
                  <a href='/share-project' className='text-blue-600 hover:underline font-medium'>Share your projects</a> it's time to squad up!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      )
    )
}

export default UserProfile