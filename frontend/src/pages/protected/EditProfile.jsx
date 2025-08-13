import React, {useState, useEffect} from 'react'
import { FormField } from '../../components'
import { searchSkills } from '../../controllers/skills'
import { editUserProfile, fetchUserProfile } from '../../controllers/user'
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
import {Button} from '../../components'

const EditProfile = () => {

  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState()

  const [userData, setUserData] = useState({
      username: '',
      name: '',
      bio: '',
      skills: [
        {
          label: '',
          value: null
        },
      ],
      github_url: '',
      x_url: ''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await fetchUserProfile()   

        setUserData({
          username: response.user.username,
          name: response.user.name,
          bio: response.user.bio,
          skills: response.skills,
          github_url: response.user.github_url,
          x_url : response.user.x_url
        })  
             
      } catch (error) {
        console.error(error)
        setError(error.response?.data?.msg)
      }finally{
        setLoading(false)      
      }
    }

    fetchUserData()
  }, [])

  const editUser = async (e) => {       
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      const res = await editUserProfile(userData)
      setSuccess(res.msg)
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.msg)
    }
  }


  const loadOptions = async (inputValue) => {
      return await searchSkills(inputValue);
  }



  return (
    loading ? (
      <div className='text-desktop-h5 w-full min-h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
       <div className='flex flex-col min-h-screen'>
        <div>
          <h4 className='text-desktop-h5 font-semibold p-8'>Edit Profile</h4>
        </div>

        <div className='px-8'>
          <form onSubmit={editUser}>
              {
                  error && (
                      <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                              { error }
                      </div>
                  )
              }

              {
                success && (
                      <div className='bg-green-400/40 rounded-lg  text-green-700 p-2 text-center my-2'>
                            { success }
                      </div>
                  )
              }

              <FormField label={"Username"} name={"username"} labelClassName='text-neutral-13' required value={userData.username} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            username: e.target.value
              }))} />

              <FormField label={"Name"} name={"name"} labelClassName='text-neutral-13' required value={userData.name} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            name: e.target.value
                        }))}/>

              <FormField label={"Bio"} name={"bio"} labelClassName='text-neutral-13' value={userData.bio} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            bio: e.target.value
                        }))}/>

              <div className='mb-5'>

                  <label className=''>
                  skills (optional)
                  </label>
                  <AsyncSelect
                      loadOptions={loadOptions}
                      defaultOptions
                      isMulti
                      placeholder=""
                      classNames={{
                          control: (state) =>
                          state.isFocused ? 'border-red-600' : 'border-grey-300',
                      }}

                      onChange={(selectedOptions) => {                         
                          setUserData(prev => ({
                              ...prev,
                              skills: selectedOptions
                          }))
                      }}

                      value={userData.skills}
                  />
              </div>

              <FormField label={"Github (optional)"} labelClassName='text-neutral-13' type={'url'} name={'github-url'} placeholder={"https://github.com"} value={userData.github_url} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            github_url: e.target.value
                        }))}/>

              <FormField label={"Twitter (optional)"} labelClassName='text-neutral-13' type={'url'} name={'x-url'} placeholder={"https://x.com"} value={userData.x_url} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            x_url: e.target.value
                        }))}/>

              <div className='flex justify-end items-center my-5'>
                  <Button type="submit" className='flex justify-center items-center border-2 border-neutral-10 text-black px-4 py-2 rounded-lg hover:bg-black/20 transition duration-300'>Edit Profile</Button>
              </div>
          </form>
        </div>
      </div>
    )
   
  )
}

export default EditProfile