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


                  <span className='text-desktop-h3 font-bold'>{projectData.title}</span>
                  <span className='text-center bg-primary-blue min-w-32 px-5 py-1 text-white rounded-xl'>{projectData.stage}</span>


                </div>

              </div>

              

              <span className='text-desktop-p'>{projectData.tagline}</span>   

              

            </div>
          
          
            <div>
                    {
                    projectData.github_url && (
                        <a href={projectData.github_url} target='_blank' className='text-desktop-p max-sm:w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-primary-blue' rel='noopener noreferrer'>
                            
                            View on github
                            <img src={Right} alt="R" />
                            
                        </a>
                        
                    )
                    }
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
        <div className='w-full flex flex-wrap  border border-neutral-5 rounded-lg p-5  gap-4'>
          {
            skills.length > 0 ? (
              skills.map(({label}) => (
                <div key={label} className='flex justify-center items-center bg-primary-blue px-2 py-1 min-w-18 font-semibold rounded-lg text-white'>
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