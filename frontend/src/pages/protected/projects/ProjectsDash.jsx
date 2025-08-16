import React, {useEffect, useState} from 'react'
import { Button, ProjectCard } from '../../../components'
import { getAllprojects, sendRequest } from '../../../controllers/projects'

const ProjectsDash = () => {

  const [offset, setOffset] = useState(0)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const LIMIT = 6;

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + LIMIT)
  }

  useEffect(() => {
    
    const fetchAllProjects = async () => {
      setLoading(true)
      try {
        const res = await getAllprojects(LIMIT, offset);  
        const newItems = res.projects
        setProjects(prevItems => [...prevItems, ...newItems]);
      } catch (error) {
        console.error(error.response.data.msg)
        setError(error.response.data.msg)        
      }finally{
        setLoading(false)
      }
    }

    fetchAllProjects();  
    
  }, [offset])

  const handleCollab = async (id) => {
    setBtnLoading(true)

    try {
      const res = await sendRequest(id)

      setProjects(prev => prev.map(p => (
        p.id === id ? {...p, requestStatus: res.project_request.status} : p
      )))
      
    } catch (error) {
      console.error(error.response.data.msg)
      setError(error.response.data.msg)   
    }finally{
      setBtnLoading(false)
    }
  }  

  return (
    loading ? (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
      <div className='p-5'>
        <h1 className='text-desktop-h4 font-bold'>Projects</h1>
        <p className='text-desktop-p text-neutral-13'>Build and collab with others</p> 

        <div className='flex flex-col space-y-4 my-10'>
          {
            projects.map((project, index) => (
              <ProjectCard key={index} id={project.id} title={project.title} tagline={project.tagline} onClick={() => handleCollab(project.id)} requestStatus={project?.requestStatus} logo={project.logo_url}/>
            ))
          }
        </div>

        <div className='flex justify-center items-center'>
          <Button className='border-2 border-primary-purple px-5 py-2 text-neutral-10 font-medium rounded-lg' onClick={() => handleLoadMore()} >
            Load More
          </Button>
        </div>

      </div>
    )
  )
}

export default ProjectsDash