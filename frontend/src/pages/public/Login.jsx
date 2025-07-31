import React from 'react'
import Logo from "../../assets/Logo.svg"
import { FaGoogle, FaGithub } from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5"
import { Button } from '../../components';
import { googleLogin, githubLogin } from '../../controllers/auth';
const Login = ({onClose}) => {

  return (
    <div className='relative bg-white flex justify-center items-center flex-col space-y-15 py-10 px-5 rounded-xl max-w-3xl mx-auto'>
        <Button className='absolute top-4 right-4 cursor-pointer' onClick={onClose}>
          <IoCloseSharp className='text-dark' size={24}/>
        </Button>
        <div className='flex flex-col justify-center items-center space-y-5'>
          <img src={Logo} alt="Crewmate" className='w-60' />
          <p className='text-xl  text-center leading-tight text-neutral-7'>Start building. Start collaborating. Find your crew and build your future.</p>
        </div>
        <div className='flex flex-col w-[50%] space-y-2'>
          <Button onClick={googleLogin} className='flex justify-center items-center border border-dark py-2 gap-3 hover:bg-primary-blue/10 transition duration-300'>
            <FaGoogle className='text-primary-blue' size={24}/>
            <span className='font-bold text-desktop-p'>Continue with Google</span>
          </Button>
          <Button onClick={githubLogin} className='flex justify-center items-center border border-dark py-2 gap-3 hover:bg-primary-blue/10 transition duration-300'>
            <FaGithub size={24}/>
            <span className='font-bold text-desktop-p'>Continue with Github</span>
          </Button>
        </div>
    </div>
  )
}

export default Login