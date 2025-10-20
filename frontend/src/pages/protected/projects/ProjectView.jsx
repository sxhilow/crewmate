import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '../../../controllers/projects'
import {Button} from '../../../components'
import { Right } from '../../../assets/icons'
import { sendRequest } from '../../../controllers/projects'
import { useUser } from '../../../context/UserContext'
import { Link } from 'react-router-dom'

const ProjectView = () => {

    const {id} = useParams()
    const {user} = useUser()
    const [userId, setUserId] = useState()
    const [projectData, setProjectData] = useState({})
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [errorStatus, setErrorStatus] = useState()
    const [success, setSuccess] = useState()
    const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    if(user){
      setUserId(user.id)
    }
  }, [user])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(id)
                console.log(data);                
                setProjectData(data.project)
                setSkills(data.skills)
            } catch (error) {
                console.error(error)
                setErrorStatus(error.response.status)
                setError(error.response.data.msg)
            }finally{
                setLoading(false)
            }
        }

        fetchProject();
    }, [])

    

    const handleCollab = async (id) => {
        setBtnLoading(true)
        setError(null)
        setSuccess(null)
        try {
          await sendRequest(id)
          setSuccess('Request Sent')
        } catch (error) {
          console.error(error)
          setErrorStatus(error.response.status)
          setError(error.response.data.msg)   
        }finally{
          setBtnLoading(false)
        }
      }  

  if (loading) {
    return (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>
        Loading...
      </div>
    )
  }

  
  if (errorStatus === 404) {
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
      <div className='max-w-3xl text-neutral-13 mx-auto my-10 md:my-20  flex flex-col space-y-10 px-4'>
        {
            error && (
                <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                    { error }
                </div>
            )
        }

        {
        success && (
                <div className='bg-green-400/20 rounded-lg  text-green-700 p-2 text-center my-2'>
                    { success }
                </div>
            )
        }
        <div className='w-full m:mb-10 flex max-sm:flex-col justify-between md:items-center space-y-3'>
        
          
            <div className='flex flex-col'>
         
              <div className='flex flex-col'>
                
                <div className='flex items-center gap-5'>


                  <span className='text-desktop-h4 font-bold'>{projectData.title}</span>
                  <span className='text-center bg-yellow-100 text-yellow-700 border border-yellow-200 min-w-32 px-5 py-1 rounded-lg'>{projectData.stage}</span>


                </div>

                <div>

                </div>

              </div>

              

              <span className='text-desktop-p'>{projectData.tagline}</span>   

              

            </div>
          
          
            <div>
                    {
                    projectData.github_url && (
                        <a href={projectData.github_url} target='_blank' className='text-desktop-p max-sm:w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-primary-blue hover:bg-blue-50 transition-colors' rel='noopener noreferrer'>
                            
                            View on github
                            <img src={Right} alt="R" />
                            
                        </a>
                    )
                    }
            </div>
      </div>

      <div className='w-full'>
        <h2 className='text-desktop-p font-medium'>Project By</h2>
        <div className='flex flex-col justify-start items-start space-y-2 border border-gray-200 shadow-sm p-6 rounded-lg'>

              <div className='flex flex-col'>
                <Button to={userId === projectData.user_id ?  `/me` : `/user/${username}`}>
                    <span className='text-xl font-bold text-neutral-10 hover:text-primary-blue'>{projectData.name}</span>
                </Button>
                <span className='text-neutral-9'>@{projectData.username}</span>
              </div>


              <div className='flex flex-wrap gap-2'>
                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                  <svg className='w-4 h-4 text-blue-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {projectData.campus}
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                  <svg className='w-4 h-4 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Year {projectData.year}
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200'>
                  <svg className='w-4 h-4 text-purple-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                    {projectData.program}
                </span>
              </div>
          </div>
      </div>
      <div className='w-full'>
        <h2 className='text-desktop-p font-medium'>Description</h2>
        <div className='w-full border border-neutral-5 rounded-lg p-5 flex wrap-break-word text-desktop-p'>
          {projectData?.description?.length > 0 ? (
            <span>
              {projectData.description}
            </span>
          ) : (
            <div>
              Project dosen't have a description
            </div>
          )}
        </div>
      </div>
      <div className='w-full'>
        <h2 className='text-desktop-p font-medium'>Skills Needed</h2>
        <div className='w-full flex flex-wrap  border border-neutral-5 rounded-lg p-6 gap-2'>
          {
            skills.length > 0 ? (
              skills.map(({label}) => (
                <div key={label} className='px-4 py-2 bg-blue-50 text-primary-blue font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'>
                  {label}
                </div>
              ))
            ) : (
              <div>
                <span className='text-neutral-7'>Project owner dosen't know what they're doing</span>                
              </div>
            )
          }          
        </div>
      </div>
      <div className='flex justify-start items-center'>
        <Button className='flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-desktop-h5 border border-primary-blue min-w-32 disabled:cursor-not-allowed disabled:opacity-50' onClick={() => handleCollab(id)} disabled={userId === projectData.user_id}>
          {btnLoading ? (
                "Sending"
          ) : (
            <>
                Collaborate
                <img src={Right} alt="icon" /> 
            </>                             
          )}
        </Button>
      </div>
    </div>
    )
}

export default ProjectView