import React, {useEffect, useState} from 'react'
import {Logo} from "../../assets/"
import { Button, FormField } from '../../components'
import AsyncSelect from 'react-select/async';
import { searchSkills } from '../../controllers/skills';
import { completeProfile } from '../../controllers/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';


const CompleteProfile = () => {

    const {user, userLoading} = useUser()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        username: '',
        name: '',
        skills: []
    })

    useEffect(() => {
        if(user){
            setUserData({
                username: user.username,
                name: user.name,
            })
        }
    }, [user])

    const loadOptions = async (inputValue) => {
        return await searchSkills(inputValue);
    }

    const completeUserProfile = async (e) => {
        e.preventDefault() 
        setError('')   
        setLoading(true)
        try {
            console.log(userData);
            
            await completeProfile(userData)
            setLoading(false)
            navigate("/dashboard")
        } catch (err) {
            console.error("Error Updating Profile: ", err);
            
            const message =
            err?.response?.data?.msg ||
            err?.message ||
            "Something went wrong.";

            setError(message);      
        }
    }

    

  return (
    userLoading ? (
        <div>Loading...</div>
    ) : (
         <div className='w-full h-full'>
            <div className='p-5'>
                <img src={Logo} alt="CREWMATE" />
                <p className='text-xl text-neutral-10'>Let’s personalize your profile so the right people can find you.</p>
            </div>
            <div className='flex justify-center items-center px-5'>

                <div className='w-full lg:my-20 my-5 lg:w-[45%] rounded-lg bg-washed-blue shadow'>

                    <div className='border-b-2 border-neutral-13 flex justify-start'>
                        <h3 className='text-desktop-h5 font-medium p-4'>Complete your profile</h3>
                    </div>

                    <form onSubmit={completeUserProfile} className='p-5'>

                        {
                            error && (
                                <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                                        { error }
                                </div>
                            )
                        }

                        <FormField name={"username"} label={"username"} labelClassName={''} inputClassName={"bg-bg border-none"} value={userData.username} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            username: e.target.value
                        }))}
                        required/>

                        <FormField name={"name"} label={"name"} labelClassName={''} inputClassName={"bg-bg border-none"} value={userData.name} onChange={(e) => setUserData(prev => ({
                            ...prev,
                            name: e.target.value
                        }))} required/>
                        
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
                                    const skillValues = selectedOptions.map(option => option.value);
                                    console.log(skillValues);
                                    
                                    setUserData(prev => ({
                                        ...prev,
                                        skills: skillValues
                                    }))
                                }}
                            />
                        </div>
                        
                        <div className='flex justify-end items-center'>
                            <Button type="submit" className='flex justify-center items-center border-2 border-neutral-10 text-black px-4 py-2 rounded-lg hover:bg-black/20 transition duration-300'>Complete Profile</Button>
                        </div>
                        
                    </form>
                </div>  
            </div>
        </div>
    )
  )
}

export default CompleteProfile