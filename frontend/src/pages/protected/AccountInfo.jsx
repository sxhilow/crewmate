import React, {useState, useEffect} from 'react'
import {fetchUserProfile} from "../../controllers/user"

const AccountInfo = () => {

  const [loading, setLoading] = useState(true)
  

  const [userData, setUserData] = useState({
      username: '',
      name: '',
      email: '',
      provider: '',
      created_at: '',
      updated_at: ''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await fetchUserProfile()   
        const user = response.user
        setUserData({
          username: user.username,
          name: user.name,
          email: user.email,
          provider: user.provider,
          created_at: user.created_at,
          updated_at: user.updated_at,
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



  return (
    loading ? (
      <div className='text-desktop-h5 w-full min-h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
       <div className='flex flex-col min-h-screen'>

        <div>
          <h4 className='text-desktop-h5 font-semibold p-8'>Account Information</h4>
        </div>

        <div className='px-8'>
          <div className='flex flex-col -space-y-3'>
            <label>username</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{userData.username}</span>
            </div>
          </div>

          <div className='flex flex-col -space-y-3'>
            <label>name</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{userData.name}</span>
            </div>
          </div>

          <div className='flex flex-col -space-y-3'>
            <label>email</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{userData.email}</span>
            </div>
          </div>

          <div className='flex flex-col -space-y-3'>
            <label>Created with</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{userData.provider}</span>
            </div>
          </div>

          <div className='flex flex-col -space-y-3'>
            <label>Created at</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{new Date(userData.created_at).toLocaleString()}</span>
            </div>
          </div>
          
          <div className='flex flex-col -space-y-3'>
            <label>Last updated at</label>
            <div className={`bg-washed-blue p-3 rounded-xl transtition duration-200 my-4`}>
                <span className='text-neutral-10 text-desktop-p '>{new Date(userData.updated_at).toLocaleString()}</span>
            </div>
          </div>

        </div>

      </div>
    )
  )
}

export default AccountInfo