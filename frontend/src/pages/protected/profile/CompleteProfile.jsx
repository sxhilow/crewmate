import React, {useEffect, useState} from 'react'
import {Logo} from "../../../assets"
import { Button, FormField } from '../../../components'
import AsyncSelect from 'react-select/async';
import { searchSkills } from '../../../controllers/skills';
import { completeProfile } from '../../../controllers/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';


const CompleteProfile = () => {

    const {user, userLoading, setUser} = useUser()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        username: '',
        name: '',
        bio: '',
        campus: '',
        year: '',
        program: '',
        github_url:'',
        x_url: '',
        skills: []
    })

    useEffect(() => {
        if(userLoading) return;
        
        if(user?.is_profile_complete){
            navigate('/projects')
        } else if(user) {
            setUserData(prev => ({
                ...prev,
                username: user.username || '',
                name: user.name || ''
            }))
        } else {
            navigate('/')
        }
    }, [user, userLoading])

    const loadOptions = async (inputValue) => {
        return await searchSkills(inputValue);
    }

    const completeUserProfile = async (e) => {
        e.preventDefault() 
        setError('')   
        setLoading(true)
        try {            
            await completeProfile(userData)            
            setUser(userData)
            navigate("/projects")
        } catch (err) {
            console.error("Error Updating Profile: ", err);            
            const message =
            err?.response?.data?.msg ||
            err?.message ||
            "Something went wrong.";
            setError(message);      

        }finally{
            setLoading(false)
        }
    }

    

  return (
    userLoading ? (
        <div className='w-full h-screen text-desktop-h2 font-bold flex justify-center items-center'>Loading...</div>
    ) : (
         <div className='w-full h-full'>
            <div className='p-5'>
                <img src={Logo} alt="CREWMATE" />
                <p className='text-md text-neutral-10'>Let’s personalize your profile so the right people can find you.</p>
            </div>
            <div className='flex justify-center items-center px-5'>

                <div className='flex flex-col w-full my-5 lg:w-[75%] rounded-lg bg-washed-blue shadow'>

                    <div className='border-b border-neutral-5 flex justify-start'>
                        <h3 className='text-desktop-h5 font-medium p-4'>Complete your profile</h3>
                    </div>

                    <form onSubmit={completeUserProfile} className='p-5 lg:px-24 lg:py-5'>

                        {
                            error && (
                                <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                                        { error }
                                </div>
                            )
                        }

                        <div className='flex w-full flex-col md:flex-row md:gap-4 items-center'>

                            <FormField 
                                name={"username"} 
                                label={"Username"} 
                                labelClassName={''} 
                                inputClassName={"w-full bg-bg border-none"} 
                                className={"w-full"}
                                value={userData.username} 
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    username: e.target.value
                                }))}
                                required
                            />

                            <FormField 
                                name={"name"} 
                                label={"Name"} 
                                labelClassName={''} 
                                inputClassName={"w-full bg-bg border-none"} 
                                className={"w-full"}
                                value={userData.name} 
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))} 
                                required
                            />
                        </div>

                        <div className='flex w-full flex-col md:flex-row md:gap-4 items-center'>

                            <div className="flex flex-col md:flex-grow w-full">
                                <label className="text-neutral-13">Campus</label>
                                <select
                                    name="campus" 
                                    className="w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none bg-bg"
                                    value={userData.campus}
                                    onChange={(e) => setUserData({...userData, campus: e.target.value})}
                                    required
                                >
                                    <option value="">Select Campus</option>
                                    <option value="UMHLANGA">UMHLANGA</option>
                                    <option value="MUSGRAVE">MUSGRAVE</option>
                                    <option value="BRYANSTON">BRYANSTON</option>
                                    <option value="CAPE TOWN">CAPE TOWN</option>
                                    <option value="CENTURION">CENTURION</option>
                                    <option value="NEWTOWN JUNCTION">NEWTOWN JUNCTION</option>
                                    <option value="PRETORIA">PRETORIA</option>
                                    <option value="POLOKWANE">POLOKWANE</option>

                                </select>
                            </div>

                            <div className="flex flex-col md:flex-grow w-full">
                                <label className="text-neutral-13">Year</label>
                                <select
                                    name="year" 
                                    className="w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none bg-bg"
                                    value={userData.year}
                                    onChange={(e) => setUserData({...userData, year: e.target.value})}
                                >
                                    <option value="">Select Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="Articulation">Articulation</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                </select>
                            </div>

                            <div className="flex flex-col md:flex-grow w-full">
                                <label className="text-neutral-13">Program</label>
                                <select
                                    name="program" 
                                    className="w-full mb-4 mt-2 text-neutral-10 px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-blue focus:outline-none bg-bg"
                                    value={userData.program}
                                    onChange={(e) => setUserData({...userData, program: e.target.value})}
                                >
                                    <option value="">Select Program</option>
                                    <option value="BSc IT">BSc IT</option>
                                    <option value="HCIT">HCIT</option>
                                    <option value="DIT">DIT</option>
                                    <option value="BCom">BCom</option>
                                    <option value="BBA">BBA</option>
                                    <option value="BSc IT Hons">BSc IT Hons</option>
                                    <option value="PGDip">PGDip</option>
                                    <option value="MBA">MBA</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <FormField 
                            type={"textarea"}
                            name={"bio"} 
                            label={"About (optional)"} 
                            labelClassName={''} 
                            inputClassName={"w-full bg-bg border-none"} 
                            className={"w-full"}
                            value={userData.bio} 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                bio: e.target.value
                            }))}
                            rows={3}
                        />

                        <FormField 
                            type={"input"}
                            name={"github_url"} 
                            label={"Github (optional)"} 
                            labelClassName={''} 
                            inputClassName={"w-full bg-bg border-none"} 
                            className={"w-full"}
                            value={userData.github_url} 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                github_url: e.target.value
                            }))}
                        />

                        <FormField 
                            type={"input"}
                            name={"x_url"} 
                            label={"X/Twitter (optional)"} 
                            labelClassName={''} 
                            inputClassName={"w-full bg-bg border-none"} 
                            className={"w-full"}
                            value={userData.x_url} 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                x_url: e.target.value
                            }))}
                        />

                        
                        <div className='mb-5'>
                            <label className=''>
                            skills (optional)
                            </label>
                            <AsyncSelect
                                loadOptions={loadOptions}
                                defaultOptions
                                isMulti
                                placeholder="Search for skills..."
                                menuPosition="fixed"
                                menuPlacement="auto"
                                maxMenuHeight={200}
                                classNames={{
                                    control: (state) =>
                                    state.isFocused ? 'border-red-600' : 'border-grey-300',
                                }}

                                onChange={(selectedOptions) => {
                                
                                    const skillValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                    console.log(skillValues);
                                    
                                    setUserData(prev => ({
                                        ...prev,
                                        skills: skillValues
                                    }))
                                                            
                                    
                                }}
                            />
                        </div>
                        
                        <div className='flex justify-end items-center'>
                            <Button type="submit" className='flex justify-center items-center border-2 border-neutral-10 text-black px-4 py-2 rounded-lg hover:bg-black/20 transition duration-300'>
                                {loading ? "completing..." : "Complete Profile"}
                            </Button>
                        </div>
                        
                    </form>
                </div>  
            </div>
        </div>
    )
  )
}

export default CompleteProfile